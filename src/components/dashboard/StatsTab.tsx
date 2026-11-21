import { Eye, Heart, Phone, Send } from "lucide-react";

const stats = [
  { label: "Profil ko'rishlar", value: 248, Icon: Eye },
  { label: "Qo'ng'iroqlar", value: 37, Icon: Phone },
  { label: "Telegram bosishlar", value: 52, Icon: Send },
  { label: "Sevimlilarga qo'shilgan", value: 19, Icon: Heart },
];

export default function StatsTab() {
  // BACKEND ULANGANDA: GET /tailors/me/stats
  return (
    <div>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, Icon }) => (
          <div key={label} className="rounded-2xl bg-brand-50 p-5">
            <Icon className="h-6 w-6 text-brand-600" />
            <p className="mt-3 font-heading text-3xl font-bold text-brand-900">
              {value}
            </p>
            <p className="mt-1 text-sm text-ink/70">{label}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-ink/50">
        Namunaviy ma'lumotlar. Backend ulangach haqiqiy statistika chiqadi.
      </p>
    </div>
  );
}