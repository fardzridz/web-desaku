/**
 * Konversi gambar di sisi browser ke format WebP sebelum diunggah ke R2.
 * (Runtime Workers tidak punya image encoder, jadi optimasi dilakukan
 *  di client: createImageBitmap + OffscreenCanvas → blob image/webp.)
 *
 * - GIF animasi dan WebP diteruskan apa adanya.
 * - Jika konversi gagal / hasil lebih besar dari asli → pakai file asli.
 */

const MAX_DIMENSION = 2000;
const QUALITY = 0.82;

export async function convertToWebP(file: File): Promise<File> {
  if (
    typeof window === "undefined" ||
    file.type === "image/webp" ||
    file.type === "image/gif" ||
    !file.type.startsWith("image/")
  ) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("OffscreenCanvas 2D tidak tersedia");
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await canvas.convertToBlob({ type: "image/webp", quality: QUALITY });
    if (blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".webp";
    return new File([blob], name, { type: "image/webp" });
  } catch {
    return file;
  }
}

/**
 * Dipasang di onChange input[type=file]: mengkonversi file terpilih
 * menjadi WebP dan menulis kembali ke input (via DataTransfer) agar
 * saat submit, server action menerima blob image/webp.
 */
export async function webpifyInput(input: HTMLInputElement): Promise<File | null> {
  const file = input.files?.[0];
  if (!file) return null;
  const converted = await convertToWebP(file);
  if (converted !== file) {
    try {
      const dt = new DataTransfer();
      dt.items.add(converted);
      input.files = dt.files;
    } catch {
      return converted;
    }
  }
  return input.files?.[0] || converted;
}
