/**
 * CoffeeCounter Component
 * Interactive coffee counter with particle effects on click
 */

import { useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function CoffeeCounter() {
  const [coffees, setCoffees] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    setCoffees(c => c + 1);
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
          className="absolute text-2xl pointer-events-none text-amber-400"
          style={{ left: particle.x - 12, top: particle.y - 12 }}
        >
          +1
        </motion.span>
      ))}
      <div className="flex items-center gap-4">
        <motion.div
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center"
          animate={{ rotate: coffees > 0 ? [0, -10, 10, -5, 5, 0] : 0 }}
          transition={{ duration: 0.5 }}
          key={coffees}
        >
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h1a4 4 0 110 8h-1M3 8h14v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8zm0-3h14v3H3V5z" />
          </svg>
        </motion.div>
        <div>
          <motion.p
            key={coffees}
            initial={{ scale: 1.5, color: "#f59e0b" }}
            animate={{ scale: 1, color: "#ffffff" }}
            className="text-3xl font-display font-bold text-white"
          >
            {coffees}
          </motion.p>
          <p className="text-sm text-dark-400">Kopi hari ini! Tekan lagi!</p>
        </div>
      </div>
    </motion.div>
  );
}
