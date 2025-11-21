"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Rarebits",
    emoji: "🧸",
    category: "Management System",
    description: "Sistem pengurusan jualan mainan terpakai. Mudahkan proses inventori, tracking jualan, dan pengurusan pelanggan.",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    features: ["Inventori Management", "Sales Tracking", "Customer Database"],
    link: "#",
  },
  {
    id: 2,
    title: "DraftlyCV",
    emoji: "📄",
    category: "Resume Builder",
    description: "Resume builder ringkas yang ATS-friendly dengan live viewing dan realtime preview. Bina CV profesional dalam minit!",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["React", "TypeScript", "Tailwind"],
    features: ["ATS-Friendly", "Live Preview", "Realtime Editing"],
    link: "#",
  },
  {
    id: 3,
    title: "Genesix Blog",
    emoji: "🎮",
    category: "Blog Platform",
    description: "Blog gaming & esports untuk komuniti gamers Malaysia. Berita terkini, tips & tricks, dan review games.",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    tags: ["Next.js", "MDX", "Vercel"],
    features: ["Gaming News", "Esports Coverage", "Game Reviews"],
    link: "#",
  },
  {
    id: 4,
    title: "ArenaHub",
    emoji: "🏆",
    category: "Event Platform",
    description: "Platform info acara esukan untuk sekolah. Cari tournament, daftar pasukan, dan track keputusan pertandingan.",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    tags: ["Next.js", "Supabase", "Real-time"],
    features: ["Tournament Finder", "Team Registration", "Live Scores"],
    link: "#",
  },
];

export default function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="work" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-background opacity-30" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-primary-400 bg-primary-500/10 border border-primary-500/20 rounded-full">
            Projek Saya
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Hasil
            <span className="text-gradient"> Kerja</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Koleksi projek web yang saya bangunkan - fokus pada fungsi praktikal dan pengalaman pengguna yang terbaik.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ background: project.image }}
              />

              {/* Content */}
              <div className="relative glass-card !bg-white/5 h-full">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.span
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    >
                      {project.emoji}
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white group-hover:text-gradient transition-all">
                        {project.title}
                      </h3>
                      <span className="text-xs text-primary-400">{project.category}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-dark-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 text-xs rounded-full bg-white/5 text-dark-300 border border-white/10"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-white border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link */}
                <motion.a
                  href={project.link}
                  className="inline-flex items-center gap-2 text-sm font-medium text-white group/link"
                  whileHover={{ x: 5 }}
                >
                  Lihat Projek
                  <svg
                    className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </motion.a>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/30 rounded-2xl transition-colors pointer-events-none" />
              </div>
            </motion.article>
          ))}
        </div>

        {/* More Projects Coming */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="glass-card max-w-md mx-auto">
            <p className="text-2xl mb-2">🚧</p>
            <p className="text-white font-medium mb-1">Lebih banyak projek akan datang!</p>
            <p className="text-dark-400 text-sm">Saya sentiasa bekerja pada projek baru. Stay tuned!</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
