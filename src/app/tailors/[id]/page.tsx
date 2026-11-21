import TailorProfile from "@/components/tailors/TailorProfile";

export default async function TailorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <TailorProfile id={id} />;
}
