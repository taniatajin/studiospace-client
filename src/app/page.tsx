import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import FeaturedStudios from "@/components/home/featured-studios";
import HowItWorks from "@/components/home/how-it-works";
import HostGuarantee from "@/components/home/host-guarantee";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedStudios />
      <HowItWorks />
      <HostGuarantee />
    </>
  );
}