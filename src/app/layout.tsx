import type { Metadata } from "next";
import { Playfair_Display, Inter, Great_Vibes } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import Navbar from "@/components/home/layout/Navbar";
import Footer from "@/components/home/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair",
});
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const script = Great_Vibes({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-great-vibes",
});
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AtelierGo — yaqin atelye va tikuvchilar",
  description: "O'zingizga yaqin tikuvchi va atelyelarni toping",
  openGraph: {
    title: "AtelierGo",
    description: "O'zingizga yaqin tikuvchi va atelyelarni toping",
    siteName: "AtelierGo",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body
        className={`${playfair.variable} ${inter.variable} ${script.variable} font-sans antialiased flex min-h-screen flex-col`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
