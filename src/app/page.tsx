import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-dark-950 noise">
      {/* Cursor follower effect container */}
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute w-96 h-96 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <Navigation />

      {/* Sections */}
      <Hero />
      <About />
      <Work />
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
