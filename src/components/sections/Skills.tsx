"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    icon: "🌐",
    title: "Website Development",
    description: "Bina laman web moden, responsif dan pantas menggunakan Next.js & React.",
  },
  {
    icon: "📱",
    title: "Web Applications",
    description: "Aplikasi web interaktif dengan fungsi lengkap untuk keperluan bisnes.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    description: "Rekabentuk antaramuka yang cantik dan mudah digunakan.",
  },
  {
    icon: "⚡",
    title: "Performance",
    description: "Optimumkan kelajuan dan prestasi untuk pengalaman terbaik.",
  },
];

const tools = [
  { name: "Next.js", emoji: "⚛️" },
  { name: "React", emoji: "💙" },
  { name: "TypeScript", emoji: "📘" },
  { name: "Tailwind CSS", emoji: "🎨" },
  { name: "Node.js", emoji: "💚" },
  { name: "PostgreSQL", emoji: "🐘" },
  { name: "Prisma", emoji: "🔺" },
  { name: "Vercel", emoji: "▲" },
  { name: "Figma", emoji: "🎯" },
  { name: "Git", emoji: "🔀" },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-background opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-400 bg-accent-500/10 border border-accent-500/20 rounded-full">
            Servis & Kemahiran
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Apa yang saya
            <span className="text-gradient"> boleh buat?</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Dari idea ke realiti - saya bantu anda bina produk digital yang berfungsi dengan baik.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group glass-card text-center hover:border-primary-500/50"
            >
              <motion.div
                className="text-5xl mb-4"
                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                {service.icon}
              </motion.div>
              <h4 className="text-lg font-semibold text-white mb-2">{service.title}</h4>
              <p className="text-sm text-dark-400">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h3 className="text-2xl font-display font-bold text-white mb-8">
            Tools & Technologies 🛠️
          </h3>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 hover:bg-white/10 transition-all cursor-default"
              >
                <span className="text-xl">{tool.emoji}</span>
                <span className="text-sm font-medium text-white">{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Fun CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="glass-card max-w-xl mx-auto">
            <p className="text-lg text-white mb-2">Ada projek dalam fikiran? 🤔</p>
            <p className="text-dark-400 mb-4">Jom bincang dan lihat macam mana saya boleh bantu!</p>
            <motion.a
              href="#contact"
              className="btn-primary inline-flex"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Mari Berbincang 💬
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
