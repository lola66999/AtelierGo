"use client";

import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

const pin = L.divIcon({
  className: "",
  html: `<div style="width:30px;height:30px;border-radius:50% 50% 50% 0;background:#962544;transform:rotate(-45deg);border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35)"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function Clicker({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function FocusOn({
  lat,
  lng,
  focus,
}: {
  lat: number;
  lng: number;
  focus: number;
}) {
  const map = useMap();

  useEffect(() => {
    if (focus > 0) map.setView([lat, lng], 16);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus]);

  return null;
}

type Props = {
  lat: number;
  lng: number;
  focus?: number;
  onChange: (lat: number, lng: number) => void;
};

export default function LocationPicker({
  lat,
  lng,
  focus = 0,
  onChange,
}: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      className="h-full w-full rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Clicker onPick={onChange} />
      <FocusOn lat={lat} lng={lng} focus={focus} />
      <Marker position={[lat, lng]} icon={pin} />
    </MapContainer>
  );
}