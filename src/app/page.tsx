import Navigation from "@/components/ui/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Game from "@/components/sections/Game";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/ui/Footer";
import Stars from "@/components/ui/Stars";
import Cursor from "@/components/ui/Cursor";
import PageWrapper from "@/components/ui/PageWrapper";

export default function Home() {
  return (
    <PageWrapper>
      <main className="relative min-h-screen bg-dark-950 noise">
        {/* Custom Cursor */}
        <Cursor />

        {/* Galaxy Stars Background */}
        <Stars />

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
        <Game />
        <Contact />

        {/* Footer */}
        <Footer />
      </main>
    </PageWrapper>
  );
}
