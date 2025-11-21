"use client";

import { motion } from "framer-motion";

const footerLinks = {
  navigation: [
    { label: "Home", href: "#home" },
    { label: "Tentang", href: "#about" },
    { label: "Servis", href: "#skills" },
    { label: "Projek", href: "#work" },
    { label: "Hubungi", href: "#contact" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 mesh-background opacity-20" />

      <div className="container-custom relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.a
              href="#home"
              className="inline-block text-3xl font-display font-bold mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-gradient">Khalid</span>
              <span className="text-white">.</span>
            </motion.a>
            <p className="text-dark-400 max-w-sm mb-6">
              Web developer dari Malaysia yang passionate dalam
              membangunkan projek web yang praktikal dan mesra pengguna.
            </p>
            <div className="flex gap-3">
              {[
                { name: "GitHub", emoji: "🐙", href: "https://github.com/genesixmy" },
                { name: "LinkedIn", emoji: "💼", href: "#" },
                { name: "Twitter", emoji: "🐦", href: "#" },
              ].map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:border-primary-500/50 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{link.emoji}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-dark-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-dark-500">
            &copy; {currentYear} Khalid. Dibuat dengan ❤️ di Malaysia.
          </p>
          <p className="text-sm text-dark-500">
            Built with Next.js, Tailwind CSS & Framer Motion
          </p>
        </div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/25 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
}
