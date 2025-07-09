import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/layout/Hero";
import { FeaturedCollections } from "@/components/sections/FeaturedCollections";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <FeaturedCollections />
        <ProductShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
