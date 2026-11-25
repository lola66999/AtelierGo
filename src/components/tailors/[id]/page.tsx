import type { Metadata } from "next";
import TailorProfile from "@/components/tailors/TailorProfile";
import { tailors } from "@/data/tailors";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const t = tailors.find((x) => x.id === id);
  if (!t) return { title: "AtelierGo" };

  const title = `${t.name} — AtelierGo`;
  const description = `${t.bio} ${t.address}`;

  return {
    title,
    description,
    openGraph: { title, description, type: "profile", siteName: "AtelierGo" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function TailorPage({ params }: Props) {
  const { id } = await params;
  return <TailorProfile id={id} />;
}