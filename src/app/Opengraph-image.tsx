import { ImageResponse } from "next/og";

export const alt = "AtelierGo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #521729 0%, #962544 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 700, display: "flex" }}>
          AtelierGo
        </div>
        <div style={{ fontSize: 44, marginTop: 20, color: "#f8e4e7", display: "flex" }}>
          Find a tailor or atelier near you
        </div>
      </div>
    ),
    { ...size }
  );
}