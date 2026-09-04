/**
 * Fix: rename R2 objects yang dobel ekstensi (xxx.jpg.jpg → xxx.jpg)
 * + migrasi thumbnail yang kettinggalan.
 */
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const R2_BUCKET = "desaku-assets";

function runWrangler(args: string[]): Promise<{ code: number; out: string }> {
  return new Promise((resolve, reject) => {
    const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
    const quoted = args.map((a) => (/[^\w.@\\\/:-]/.test(a) ? `"${a}"` : a));
    const child = spawn(npxCmd, quoted, { stdio: ["ignore", "pipe", "pipe"], shell: true });
    let out = "";
    child.stdout.on("data", (d: Buffer) => (out += d.toString()));
    child.stderr.on("data", (d: Buffer) => (out += d.toString()));
    child.on("close", (code) => resolve({ code: code ?? 1, out }));
    child.on("error", reject);
  });
}

// Key lama (dobel ekstensi) → key baru (ekstensi tunggal)
const RENAMES = [
  "legacy/imgbb-1775820327528.png.png",
  "legacy/imgbb-1000300351.jpg.jpg",
  "legacy/imgbb-Whats-App-Image2026-01-14at12-52-33-1-593135.jpg.jpg",
  "legacy/imgbb-1777195764263.jpg.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-18-3.jpg.jpg",
  "legacy/imgbb-1000006822.jpg.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-18-5.jpg.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-16-3.jpg.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-18-2.jpg.jpg",
  "legacy/imgbb-Whats-App-Image-2024-06-14-at-20-01-16-1.jpg.jpg",
];

const tmpDir = fs.mkdtempSync(path.join(process.env.TEMP || "/tmp", "r2fix-"));

async function main() {
  let ok = 0;
  let fail = 0;

  for (const oldKey of RENAMES) {
    const newKey = oldKey.replace(/(\.\w+)\1$/, "$1");
    const ext = path.extname(oldKey);
    const tmpFile = path.join(tmpDir, "obj" + ext);

    const get = await runWrangler([
      "wrangler", "r2", "object", "get", `${R2_BUCKET}/${oldKey}`,
      "--file", tmpFile, "--remote",
    ]);
    if (get.code !== 0) {
      console.log(`SKIP ${oldKey} → tidak ketemu`);
      fail++;
      continue;
    }

    const put = await runWrangler([
      "wrangler", "r2", "object", "put", `${R2_BUCKET}/${newKey}`,
      "--file", tmpFile, "--remote",
    ]);
    if (put.code !== 0) {
      console.log(`FAIL put ${newKey}`);
      fail++;
      continue;
    }

    await runWrangler(["wrangler", "r2", "object", "delete", `${R2_BUCKET}/${oldKey}`, "--remote"]);
    console.log(`OK ${oldKey} → ${newKey}`);
    ok++;
  }

  // Migrasi thumbnail yang kettinggalan
  try {
    const res = await fetch("https://i.ibb.co.com/wFKWKFsb/1000364727.jpg", { redirect: "follow" });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      const tmpFile = path.join(tmpDir, "thumb.jpg");
      fs.writeFileSync(tmpFile, buf);
      const put = await runWrangler([
        "wrangler", "r2", "object", "put", `${R2_BUCKET}/legacy/imgbb-1000364727.jpg`,
        "--file", tmpFile, "--content-type", "image/jpeg", "--remote",
      ]);
      if (put.code === 0) {
        console.log(`OK thumbnail → legacy/imgbb-1000364727.jpg (${Math.round(buf.length / 1024)}KB)`);
        ok++;
        // Update identitas.thumbnail_url di D1 remote
        const sql = "UPDATE identitas SET thumbnail_url = 'https://assets.portal-wringinanom.web.id/legacy/imgbb-1000364727.jpg' WHERE id = 1;";
        const sqlFile = path.join(tmpDir, "fix-thumb.sql");
        fs.writeFileSync(sqlFile, sql, "utf8");
        const exec = await runWrangler([
          "wrangler", "d1", "execute", "desaku-db", "--remote", "--file", sqlFile,
        ]);
        console.log(exec.code === 0 ? "OK identitas.thumbnail_url di-update ke R2" : `FAIL update D1: ${exec.out.slice(-200)}`);
      } else {
        console.log(`FAIL upload thumbnail: ${put.out.slice(-200)}`);
        fail++;
      }
    }
  } catch (e) {
    console.log(`Thumbnail gagal: ${e}`);
    fail++;
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });
  console.log(`\nSelesai: ${ok} OK, ${fail} gagal`);
}

main();
