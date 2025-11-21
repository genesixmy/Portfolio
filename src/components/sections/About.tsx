"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";

const stats = [
  { number: "4+", label: "Projek Siap" },
  { number: "100%", label: "Passion" },
  { number: "24/7", label: "Code Mode" },
  { number: "1", label: "Mission" },
];

// Interactive card that tilts on mouse move
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Interactive click counter
function ClickCounter() {
  const [clicks, setClicks] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    setClicks(c => c + 1);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newParticle = { id: Date.now(), x, y };
    setParticles(p => [...p, newParticle]);
    setTimeout(() => {
      setParticles(p => p.filter(particle => particle.id !== newParticle.id));
    }, 1000);
  };

  return (
    <motion.div
      onClick={handleClick}
      className="relative glass-card cursor-pointer select-none overflow-hidden"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {particles.map(particle => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 1, scale: 0, x: particle.x, y: particle.y }}
          animate={{ opacity: 0, scale: 2, y: particle.y - 50 }}
          className="absolute text-2xl pointer-events-none"
          style={{ left: particle.x - 12, top: particle.y - 12 }}
        >
          +1
        </motion.span>
      ))}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <motion.svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: clicks * 10 }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </motion.svg>
        </div>
        <div>
          <motion.p
            key={clicks}
            initial={{ scale: 1.5, color: "#a855f7" }}
            animate={{ scale: 1, color: "#ffffff" }}
            className="text-3xl font-display font-bold text-white"
          >
            {clicks}
          </motion.p>
          <p className="text-sm text-dark-400">Clicks! Tekan lagi!</p>
        </div>
      </div>
    </motion.div>
  );
}

// Interactive mood selector
function MoodSelector() {
  const moods = [
    { emoji: "🔥", label: "On Fire", color: "from-orange-500 to-red-500" },
    { emoji: "💡", label: "Creative", color: "from-yellow-500 to-orange-500" },
    { emoji: "🚀", label: "Productive", color: "from-blue-500 to-purple-500" },
    { emoji: "☕", label: "Coding", color: "from-amber-700 to-amber-500" },
  ];
  const [selected, setSelected] = useState(2);

  return (
    <div className="glass-card">
      <p className="text-sm text-dark-400 mb-3">Status hari ini:</p>
      <div className="flex gap-2">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.label}
            onClick={() => setSelected(index)}
            className={`relative flex-1 p-3 rounded-xl text-center transition-all ${
              selected === index
                ? `bg-gradient-to-br ${mood.color} text-white`
                : "bg-white/5 hover:bg-white/10"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl block mb-1">{mood.emoji}</span>
            <span className="text-xs">{mood.label}</span>
            {selected === index && (
              <motion.div
                layoutId="moodIndicator"
                className="absolute inset-0 rounded-xl border-2 border-white/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// Draggable card
function DraggableCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={`cursor-grab ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

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
            Membina Digital
            <span className="text-gradient"> Excellence</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Saya transform idea kompleks menjadi solusi digital yang elegan dan mesra pengguna.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Interactive Elements */}
          <motion.div style={{ y }} className="space-y-6">
            {/* 3D Tilt Card - Main Profile */}
            <TiltCard className="perspective-1000">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8 }}
                className="relative aspect-square max-w-md mx-auto"
              >
                {/* Decorative Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 p-[2px]">
                  <div className="w-full h-full bg-dark-900 rounded-3xl" />
                </div>

                {/* Image Container */}
                <div className="absolute inset-4 rounded-2xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Avatar */}
                    <motion.div
                      className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(168, 85, 247, 0.4)",
                          "0 0 60px rgba(168, 85, 247, 0.6)",
                          "0 0 20px rgba(168, 85, 247, 0.4)",
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <span className="text-6xl font-display font-bold text-white">K</span>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </motion.div>
            </TiltCard>

            {/* Interactive Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <DraggableCard key={stat.label}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.3)"
                    }}
                    className="glass-card text-center"
                  >
                    <p className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.number}</p>
                    <p className="text-sm text-dark-400 mt-1">{stat.label}</p>
                  </motion.div>
                </DraggableCard>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Content & Interactive Elements */}
          <div className="space-y-6">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card"
            >
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Salam, saya Khalid
              </h3>
              <p className="text-dark-400 leading-relaxed mb-4">
                Saya seorang web developer dari Malaysia yang passionate dalam membangunkan
                projek web yang <span className="text-primary-400">praktikal</span> dan{" "}
                <span className="text-accent-400">mesra pengguna</span>.
              </p>
              <p className="text-dark-400 leading-relaxed">
                Fokus saya adalah pada kegunaan sebenar - bukan sekadar cantik, tetapi
                benar-benar membantu pengguna mencapai matlamat mereka dengan cara yang
                paling ringkas dan berkesan.
              </p>
            </motion.div>

            {/* Interactive Click Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <ClickCounter />
            </motion.div>

            {/* Interactive Mood Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MoodSelector />
            </motion.div>

            {/* What I Do */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h4 className="text-lg font-semibold text-white mb-4">Apa Yang Saya Buat</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", label: "Web Apps" },
                  { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", label: "UI/UX" },
                  { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", label: "Clean Code" },
                  { icon: "M13 10V3L4 14h7v7l9-11h-7z", label: "Fast Sites" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "rgba(168, 85, 247, 0.1)"
                    }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-primary-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <span className="text-sm text-dark-300">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="#work"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Lihat Projek Saya
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Hubungi Saya
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
