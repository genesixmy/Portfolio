"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "khalid@example.com",
    href: "mailto:khalid@example.com",
  },
  {
    icon: "📍",
    label: "Lokasi",
    value: "Malaysia 🇲🇾",
    href: "#",
  },
  {
    icon: "⏰",
    label: "Response Time",
    value: "Biasanya dalam 24 jam",
    href: "#",
  },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={containerRef} className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 mesh-background opacity-50" />
      <div className="absolute top-1/3 -left-1/4 w-1/2 h-1/2 bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-1/4 w-1/2 h-1/2 bg-accent-500/10 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-accent-400 bg-accent-500/10 border border-accent-500/20 rounded-full">
            Hubungi Saya
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6">
            Jom
            <span className="text-gradient"> Berhubung!</span>
          </h2>
          <p className="text-lg text-dark-400 max-w-2xl mx-auto">
            Ada idea projek? Nak collaborate? Atau sekadar nak say hi?
            Saya sentiasa terbuka untuk berbincang!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-card">
              <h3 className="text-xl font-display font-bold text-white mb-4">
                Mari berbual! 💬
              </h3>
              <p className="text-dark-400 mb-6">
                Saya suka berjumpa dengan orang baru dan mendengar idea-idea menarik.
                Jangan segan untuk reach out!
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-2xl">{info.icon}</span>
                    <div>
                      <p className="text-xs text-dark-500">{info.label}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card"
            >
              <p className="text-sm text-dark-400 mb-4">Connect di social media</p>
              <div className="flex gap-3">
                {[
                  { name: "GitHub", emoji: "🐙", href: "https://github.com/genesixmy" },
                  { name: "LinkedIn", emoji: "💼", href: "#" },
                  { name: "Twitter", emoji: "🐦", href: "#" },
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-dark-300 hover:text-white hover:border-primary-500/50 hover:bg-white/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>{social.emoji}</span>
                    <span className="text-sm">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card !p-8">
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-dark-300 mb-2">
                    Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="Nama anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-dark-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-dark-300 mb-2">
                  Subjek
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                >
                  <option value="" className="bg-dark-900">Pilih subjek</option>
                  <option value="project" className="bg-dark-900">Projek Baru</option>
                  <option value="collaboration" className="bg-dark-900">Collaboration</option>
                  <option value="question" className="bg-dark-900">Soalan</option>
                  <option value="sayhi" className="bg-dark-900">Nak Say Hi! 👋</option>
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-dark-300 mb-2">
                  Mesej
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-dark-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors resize-none"
                  placeholder="Ceritakan tentang projek atau idea anda..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full py-4 rounded-xl font-semibold text-white transition-all duration-300",
                  isSubmitting
                    ? "bg-dark-700 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary-600 to-primary-500 hover:shadow-lg hover:shadow-primary-500/25 hover:-translate-y-0.5"
                )}
                whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Menghantar...
                  </span>
                ) : (
                  "Hantar Mesej 🚀"
                )}
              </motion.button>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-center"
                >
                  Terima kasih! Mesej anda telah dihantar. Saya akan reply secepat mungkin! 🙏
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
