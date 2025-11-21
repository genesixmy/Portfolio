"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const stats = [
  { number: "8+", label: "Years Experience" },
  { number: "150+", label: "Projects Completed" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Awards Won" },
];

const experiences = [
  {
    year: "2023 - Present",
    role: "Lead Creative Developer",
    company: "Nexus Digital Studio",
    description: "Leading a team of developers to create immersive web experiences for Fortune 500 clients.",
  },
  {
    year: "2020 - 2023",
    role: "Senior Frontend Developer",
    company: "Creative Minds Agency",
    description: "Developed award-winning interactive websites and web applications using cutting-edge technologies.",
  },
  {
    year: "2018 - 2020",
    role: "UI/UX Designer & Developer",
    company: "Digital Dreams Inc.",
    description: "Designed and developed responsive websites and mobile applications for diverse clientele.",
  },
];

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
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Crafting Digital
            <span className="text-gradient"> Excellence</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            With over 8 years of experience in web development and design, I transform complex ideas into elegant, user-centric digital solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Image & Stats */}
          <motion.div style={{ y }} className="relative">
            {/* Main Image */}
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
                  {/* Placeholder Avatar */}
                  <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <span className="text-6xl font-display font-bold text-white">AC</span>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border border-white/20 rounded-full" />
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -right-4 top-1/4 glass-card !p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Award Winner</p>
                    <p className="text-xs text-dark-400">Awwwards 2024</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating Badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="absolute -left-4 bottom-1/4 glass-card !p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Certified</p>
                    <p className="text-xs text-dark-400">Google UX Design</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                  className="glass-card text-center"
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient">{stat.number}</p>
                  <p className="text-sm text-dark-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold text-white mb-4">
                Hello, I&apos;m Alex Chen
              </h3>
              <p className="text-dark-400 leading-relaxed mb-4">
                I&apos;m a passionate creative developer and designer based in San Francisco. I specialize in creating immersive digital experiences that push the boundaries of what&apos;s possible on the web.
              </p>
              <p className="text-dark-400 leading-relaxed">
                My approach combines technical expertise with artistic vision, resulting in work that is both functionally robust and visually captivating. I believe in the power of design to solve complex problems and create meaningful connections.
              </p>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Experience</h4>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="relative pl-6 border-l-2 border-dark-700 hover:border-primary-500 transition-colors"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-dark-900 border-2 border-primary-500" />
                    <span className="text-sm text-primary-400 font-medium">{exp.year}</span>
                    <h5 className="text-white font-semibold mt-1">{exp.role}</h5>
                    <p className="text-dark-500 text-sm">{exp.company}</p>
                    <p className="text-dark-400 text-sm mt-2">{exp.description}</p>
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
                href="/resume.pdf"
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-secondary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Let&apos;s Connect
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
