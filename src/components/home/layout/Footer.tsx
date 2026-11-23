import Link from "next/link";
import { Scissors } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-cream-dark bg-brand-900 text-brand-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <div className="flex items-center gap-2">
            <Scissors className="h-6 w-6" />
            <span className="font-heading text-2xl font-bold text-white">
              Atelier<span className="text-brand-300">Go</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-brand-200">
            O'zingizga yaqin tikuvchi va atelyelarni toping, portfolio bilan
            tanishing va bevosita bog'laning.
          </p>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white">Sahifalar</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/tailors" className="hover:text-white">
                Atelyelar
              </Link>
            </li>
            <li>
              <Link href="/map" className="hover:text-white">
                Xarita
              </Link>
            </li>
            <li>
              <Link href="/favorites" className="hover:text-white">
                Sevimlilar
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-lg text-white">Tikuvchilar uchun</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/register?role=tailor" className="hover:text-white">
                Tikuvchi bo'lish
              </Link>
            </li>

            <li>
              <Link href="/dashboard" className="hover:text-white">
                Kabinet
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-800 py-4 text-center text-xs text-brand-300">
        © {new Date().getFullYear()} AtelierGo. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
