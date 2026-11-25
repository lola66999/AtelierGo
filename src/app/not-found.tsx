import Link from "next/link";
import { Scissors } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <Scissors className="h-14 w-14 -rotate-12 text-brand-400" />
      <p className="mt-4 font-script text-5xl text-brand-600">404</p>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-900">
        Sahifa topilmadi
      </h1>
      <p className="mt-3 text-ink/70">
        Siz qidirgan sahifa mavjud emas yoki boshqa joyga ko'chirilgan.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-700 px-6 py-2.5 font-medium text-white hover:bg-brand-800"
        >
          Bosh sahifa
        </Link>
        <Link
          href="/tailors"
          className="rounded-full border border-brand-700 px-6 py-2.5 font-medium text-brand-700 hover:bg-brand-50"
        >
          Atelyelarni ko'rish
        </Link>
      </div>
    </div>
  );
}