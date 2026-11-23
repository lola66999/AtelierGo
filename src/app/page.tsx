import Hero from "@/components/home/Hero";
import CategoryRow from "@/components/home/CategoryRow";
import NearbySection from "@/components/home/NearbySection";
import BecomeTailorBanner from "@/components/home/BecomeTailorBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRow />
      <NearbySection />
      <BecomeTailorBanner />
    </>
  );
}