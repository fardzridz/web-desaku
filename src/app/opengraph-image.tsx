import { ImageResponse } from "next/og";

export const alt = "Portal Resmi Desa Wringinanom, Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #064e3b 0%, #047857 55%, #059669 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 132,
            height: 132,
            borderRadius: 66,
            border: "5px solid rgba(255,255,255,0.35)",
            backgroundColor: "rgba(255,255,255,0.12)",
            marginBottom: 44,
          }}
        >
          <div style={{ fontSize: 72, fontWeight: 700, display: "flex" }}>W</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          Desa Wringinanom
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            opacity: 0.85,
            marginBottom: 40,
          }}
        >
          Kecamatan Tongas, Kabupaten Probolinggo, Jawa Timur
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            padding: "14px 40px",
            borderRadius: 999,
            border: "2px solid rgba(255,255,255,0.4)",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          Portal Resmi Pemerintah Desa
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
