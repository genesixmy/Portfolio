"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const funFacts = [
  { emoji: "☕", text: "Kopi sebelum code" },
  { emoji: "🎮", text: "Gamer sejati" },
  { emoji: "🌙", text: "Night owl developer" },
  { emoji: "🚀", text: "Ship fast, iterate faster" },
];

const techStack = [
  "Next.js", "React", "TypeScript", "Tailwind CSS",
  "Node.js", "PostgreSQL", "Prisma", "Vercel"
];

// Random coding quotes
const quotes = [
  "Code is like humor. When you have to explain it, it's bad.",
  "First, solve the problem. Then, write the code.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "The best error message is the one that never shows up.",
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [currentQuote, setCurrentQuote] = useState(0);
  const [coffeeCount, setCoffeeCount] = useState(0);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Fun coffee counter
  const addCoffee = () => {
    setCoffeeCount((prev) => prev + 1);
  };

  return (
    <section id="about" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 mesh-background opacity-50" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 border border-primary-500/20 rounded-full">
            Tentang Saya
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Siapa
            <span className="text-gradient"> Khalid?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Fun Interactive Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Avatar with fun interaction */}
            <div className="relative max-w-sm mx-auto lg:mx-0">
              <motion.div
                className="aspect-square rounded-3xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-white/10 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-center p-8">
                  <motion.div
                    className="text-8xl mb-4"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  >
                    👨‍💻
                  </motion.div>
                  <p className="text-xl font-display font-bold text-white">Khalid</p>
                  <p className="text-dark-400 text-sm">Web Developer</p>
                </div>
              </motion.div>

              {/* Floating fun badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute -right-4 -bottom-4 glass-card !p-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🇲🇾</span>
                  <span className="text-sm text-white font-medium">Malaysia</span>
                </div>
              </motion.div>
            </div>

            {/* Interactive Coffee Counter - Fun Element! */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card text-center"
            >
              <p className="text-dark-400 text-sm mb-3">Klik untuk bagi saya kopi! ☕</p>
              <motion.button
                onClick={addCoffee}
                className="text-6xl mb-3 cursor-pointer hover:scale-110 transition-transform"
                whileTap={{ scale: 0.9, rotate: -10 }}
              >
                ☕
              </motion.button>
              <p className="text-2xl font-display font-bold text-gradient">
                {coffeeCount} kopi hari ini
              </p>
              {coffeeCount >= 5 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-accent-400 mt-2"
                >
                  Wah, terima kasih banyak! 🚀
                </motion.p>
              )}
              {coffeeCount >= 10 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-primary-400 mt-1"
                >
                  Sekarang saya boleh code sampai subuh! 🌙
                </motion.p>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card"
            >
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Salam! 👋
              </h3>
              <p className="text-dark-400 leading-relaxed mb-4">
                Saya Khalid, seorang web developer dari Malaysia yang passionate dalam
                membangunkan projek web yang <span className="text-primary-400">praktikal</span> dan{" "}
                <span className="text-accent-400">mesra pengguna</span>.
              </p>
              <p className="text-dark-400 leading-relaxed">
                Fokus saya adalah pada kegunaan sebenar - bukan sekadar cantik,
                tetapi benar-benar membantu pengguna mencapai matlamat mereka dengan
                cara yang paling ringkas dan berkesan.
              </p>
            </motion.div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Fun Facts</h4>
              <div className="grid grid-cols-2 gap-3">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={fact.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all cursor-default"
                  >
                    <span className="text-2xl block mb-2">{fact.emoji}</span>
                    <span className="text-sm text-dark-300">{fact.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Tech Stack Kegemaran</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white border border-white/10 hover:border-primary-500/50 transition-all cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Rotating Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-card relative overflow-hidden"
            >
              <div className="absolute top-2 right-3 text-4xl opacity-20">💭</div>
              <p className="text-sm text-dark-500 mb-2">Quote of the moment:</p>
              <motion.p
                key={currentQuote}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-dark-300 italic"
              >
                &ldquo;{quotes[currentQuote]}&rdquo;
              </motion.p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
