import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProblemSection } from "./components/ProblemSection";
import { PillarsSection } from "./components/PillarsSection";
import { ProductShowcase } from "./components/ProductShowcase";
import { EcosystemSection } from "./components/EcosystemSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0b10]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <PillarsSection />
      <ProductShowcase />
      <EcosystemSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
