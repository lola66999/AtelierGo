"use client";

import { useEffect } from "react";
import Link from "next/link";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import { TailorWithDistance } from "@/services/types";

// Standart ikonka rasmlari Next.js'da muammo beradi, shuning uchun o'zimiznikini chizamiz
const pin = L.divIcon({
  className: "",
  html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:#962544;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -28],
});

function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

type Props = {
  tailors: TailorWithDistance[];
  center: [number, number];
  user?: { lat: number; lng: number } | null;
};

export default function TailorsMap({ tailors, center, user }: Props) {
  return (
    <MapContainer
      center={center}
      zoom={12}
      scrollWheelZoom
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter center={center} />

      {user && (
        <CircleMarker
          center={[user.lat, user.lng]}
          radius={9}
          pathOptions={{ color: "#fff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }}
        />
      )}

      {tailors.map((t) => (
        <Marker key={t.id} position={[t.lat, t.lng]} icon={pin}>
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-semibold">{t.name}</p>
              <p className="text-xs text-gray-600">{t.address}</p>
              <p className="mt-1 text-sm">⭐ {t.rating.toFixed(1)}</p>
              <Link
                href={`/tailors/${t.id}`}
                className="mt-1 inline-block text-sm font-medium text-[#962544]"
              >
                Profilni ko'rish →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}