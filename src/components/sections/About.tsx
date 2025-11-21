"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TiltCard, CoffeeCounter, MoodSelector, DraggableCard } from "@/components/about";
import { stats } from "@/constants";

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
                Salam, saya Khalid Zainal
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

            {/* Interactive Coffee Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <CoffeeCounter />
            </motion.div>

            {/* Interactive Mood Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <MoodSelector />
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
