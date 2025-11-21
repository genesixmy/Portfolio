"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["All", "Web App", "Platform", "Tool"];

const projects = [
  {
    id: 1,
    title: "Rarebits",
    category: "Web App",
    description: "Sistem pengurusan jualan mainan terpakai. Mudahkan proses inventori, tracking jualan, dan pengurusan pelanggan.",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "DraftlyCV",
    category: "Tool",
    description: "Resume builder ringkas yang ATS-friendly dengan live viewing dan realtime preview. Bina CV profesional dalam minit.",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["React", "TypeScript", "Tailwind"],
    link: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Genesix Blog",
    category: "Platform",
    description: "Blog gaming & esports untuk komuniti gamers Malaysia. Berita terkini, tips & tricks, dan review games.",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    tags: ["Next.js", "MDX", "Vercel"],
    link: "#",
    featured: true,
  },
  {
    id: 4,
    title: "ArenaHub",
    category: "Platform",
    description: "Platform info acara esukan untuk sekolah. Cari tournament, daftar pasukan, dan track keputusan pertandingan.",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    tags: ["Next.js", "Supabase", "Real-time"],
    link: "#",
  },
];

export default function Work() {
  const [activeCategory, setActiveCategory] = useState("All");
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

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
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Featured
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Koleksi projek web yang saya bangunkan - fokus pada fungsi praktikal dan pengalaman pengguna yang terbaik.
          </p>
        </motion.div>

        {/* What I Do */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h4 className="text-lg font-semibold text-white text-center mb-6">Apa Yang Saya Buat</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
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
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(168, 85, 247, 0.1)"
                }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer transition-colors"
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

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-white/5 text-dark-400 hover:bg-white/10 hover:text-white border border-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative rounded-2xl overflow-hidden"
              >
                {/* Image/Gradient Background */}
                <div
                  className="aspect-[16/10] w-full relative"
                  style={{ background: project.image }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent opacity-90 group-hover:opacity-95 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category Badge */}
                    <span className="self-start px-3 py-1 mb-3 text-xs font-medium text-primary-400 bg-primary-500/20 backdrop-blur-sm rounded-full border border-primary-500/20">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-2xl font-display font-bold text-white mb-2 group-hover:text-gradient transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-dark-300 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium text-dark-200 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10"
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
                      View Project
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
                  </div>

                  {/* Hover Border Effect */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-500/50 rounded-2xl transition-colors" />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="glass-card text-center">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <blockquote className="text-lg md:text-xl text-dark-300 italic mb-4">
              &ldquo;Setiap projek adalah peluang untuk belajar sesuatu yang baru dan mencipta sesuatu yang bermakna.&rdquo;
            </blockquote>
            <cite className="not-italic">
              <span className="block text-white font-semibold">Khalid</span>
              <span className="text-dark-500 text-sm">Web Developer</span>
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
