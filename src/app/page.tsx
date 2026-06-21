import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";
import About from "@/components/About";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <Projects />
      <TechStack />
      <About />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
