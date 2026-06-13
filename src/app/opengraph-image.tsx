import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.nome} — ${site.slogan}`;
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #1E9B5E 0%, #14744A 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "20px",
              background: "#ffffff",
              color: "#14532d",
              fontSize: "52px",
              fontWeight: 900,
            }}
          >
            M
          </div>
          <div style={{ fontSize: "44px", fontWeight: 800 }}>studioMOVA</div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: "76px",
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          <span>A vida precisa</span>
          <span>de movimento</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "28px",
            fontSize: "34px",
            color: "#D9FBE8",
          }}
        >
          {site.slogan} · Academia boutique na Asa Norte, Brasília
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "44px",
            fontSize: "28px",
            color: "#EAFBF1",
          }}
        >
          ⭐ {site.avaliacao.nota} — {site.avaliacao.total} avaliações no{" "}
          {site.avaliacao.fonte}
        </div>
      </div>
    ),
    { ...size },
  );
}
