"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["All", "Web Design", "Development", "Branding", "3D/Motion"];

const projects = [
  {
    id: 1,
    title: "Nebula Finance",
    category: "Web Design",
    description: "A revolutionary fintech dashboard with real-time analytics and stunning data visualizations.",
    image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    tags: ["React", "Three.js", "D3.js"],
    link: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Artisan Coffee Co.",
    category: "Branding",
    description: "Complete brand identity and e-commerce platform for a premium coffee roastery.",
    image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    tags: ["Next.js", "Shopify", "Figma"],
    link: "#",
    featured: true,
  },
  {
    id: 3,
    title: "Quantum Studios",
    category: "3D/Motion",
    description: "Immersive 3D web experience showcasing architectural visualization projects.",
    image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    tags: ["Three.js", "GSAP", "WebGL"],
    link: "#",
    featured: true,
  },
  {
    id: 4,
    title: "TechFlow SaaS",
    category: "Development",
    description: "Full-stack SaaS platform with advanced user management and payment integration.",
    image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    tags: ["Node.js", "PostgreSQL", "Stripe"],
    link: "#",
  },
  {
    id: 5,
    title: "Zenith Wellness",
    category: "Web Design",
    description: "Calming, accessible wellness platform with booking system and resource library.",
    image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    tags: ["Next.js", "Tailwind", "Sanity"],
    link: "#",
  },
  {
    id: 6,
    title: "Motion Studio",
    category: "3D/Motion",
    description: "Creative agency portfolio with fluid animations and scroll-triggered effects.",
    image: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    tags: ["Framer Motion", "GSAP", "React"],
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
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Selected
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            A curated collection of my most impactful work, showcasing the intersection
            of design excellence and technical innovation.
          </p>
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
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "group relative rounded-2xl overflow-hidden cursor-pointer",
                  project.featured && "md:col-span-2 lg:col-span-1"
                )}
              >
                {/* Image/Gradient Background */}
                <div
                  className="aspect-[4/3] w-full"
                  style={{ background: project.image }}
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    {/* Category Badge */}
                    <span className="self-start px-3 py-1 mb-3 text-xs font-medium text-primary-400 bg-primary-500/20 rounded-full">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-gradient transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-dark-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs text-dark-300 bg-white/5 rounded"
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

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-dark-300 hover:text-white border border-white/10 hover:border-white/30 rounded-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 max-w-3xl mx-auto"
        >
          <div className="glass-card text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-2xl font-display font-bold text-white">JD</span>
            </div>
            <blockquote className="text-xl md:text-2xl text-white font-light italic mb-6">
              &ldquo;Alex transformed our vision into a stunning digital reality. The attention to detail
              and innovative approach exceeded all expectations.&rdquo;
            </blockquote>
            <cite className="not-italic">
              <span className="block text-white font-semibold">Jane Doe</span>
              <span className="text-dark-400 text-sm">CEO, Nebula Finance</span>
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
