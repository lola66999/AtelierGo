import { ImageResponse } from "next/og";
import { tailors } from "@/data/tailors";

export const alt = "AtelierGo tikuvchi profili";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = tailors.find((x) => x.id === id);
  const name = t?.name ?? "AtelierGo";
  const address = t?.address ?? "";
  const rating = t ? `${t.rating.toFixed(1)} / 5` : "";
  const initial = name.charAt(0).toUpperCase();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #521729 0%, #962544 100%)",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, color: "#f8e4e7" }}>
          AtelierGo
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 90,
              background: "#f8e4e7",
              color: "#7a1c37",
              fontSize: 100,
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 48,
            }}
          >
            {initial}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 76, fontWeight: 700, display: "flex" }}>
              {name}
            </div>
            {address ? (
              <div
                style={{
                  fontSize: 34,
                  marginTop: 14,
                  color: "#efc6cd",
                  display: "flex",
                }}
              >
                {address}
              </div>
            ) : null}
          </div>
        </div>

        <div
          style={{ display: "flex", justifyContent: "space-between", fontSize: 36 }}
        >
          <div style={{ display: "flex", color: "#f8e4e7" }}>
            {rating ? `Rating ${rating}` : ""}
          </div>
          <div style={{ display: "flex", color: "#f8e4e7" }}>
            Find a tailor near you
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}