"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingProps {
  onComplete: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "exit">("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.max(2, (100 - prev) / 5);
        return Math.min(100, prev + increment);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase("reveal"), 150);
      setTimeout(() => setPhase("exit"), 600);
      setTimeout(() => onComplete(), 900);
    }
  }, [progress, onComplete]);

  // Constellation stars (restored)
  const constellationStars = [
    { x: 20, y: 25, delay: 0 },
    { x: 35, y: 15, delay: 0.1 },
    { x: 50, y: 20, delay: 0.2 },
    { x: 65, y: 12, delay: 0.3 },
    { x: 80, y: 22, delay: 0.4 },
    { x: 25, y: 45, delay: 0.15 },
    { x: 45, y: 55, delay: 0.25 },
    { x: 70, y: 48, delay: 0.35 },
    { x: 15, y: 70, delay: 0.2 },
    { x: 40, y: 78, delay: 0.3 },
    { x: 60, y: 72, delay: 0.4 },
    { x: 85, y: 68, delay: 0.5 },
  ];

  // Floating particles
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 1,
  }));

  // Galaxy spiral arms stars
  const galaxyStars = Array.from({ length: 60 }, (_, i) => {
    const angle = (i / 60) * Math.PI * 4; // 2 full rotations
    const radius = 10 + (i / 60) * 50; // Expanding radius
    const wobble = Math.sin(i * 0.5) * 5;
    return {
      id: i,
      x: Math.cos(angle) * (radius + wobble),
      y: Math.sin(angle) * (radius + wobble),
      size: Math.random() * 2 + 1,
      opacity: 0.3 + (1 - i / 60) * 0.7,
      delay: i * 0.02,
    };
  });

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "radial-gradient(ellipse at center, #1a1a2e 0%, #0d0d1a 50%, #050510 100%)",
          }}
        >
          {/* Animated gradient orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            }}
            animate={{
              x: [-50, 50, -50],
              y: [-30, 30, -30],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            }}
            animate={{
              x: [50, -50, 50],
              y: [30, -30, 30],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                y: [0, -20, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Constellation stars */}
          {constellationStars.map((star, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: phase === "loading" ? [0, 1, 0.5, 1] : 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: star.delay,
                opacity: {
                  duration: 2,
                  repeat: phase === "loading" ? Infinity : 0,
                  ease: "easeInOut",
                },
              }}
            >
              <div
                className="w-2 h-2 rounded-full bg-white"
                style={{
                  boxShadow: "0 0 10px 2px rgba(255, 255, 255, 0.5), 0 0 20px 4px rgba(168, 85, 247, 0.3)",
                }}
              />
            </motion.div>
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Galaxy spiral animation */}
            <motion.div
              className="relative mb-8 w-32 h-32"
              initial={{ scale: 0.8, opacity: 0, rotate: -90 }}
              animate={{
                scale: phase === "reveal" ? [1, 1.2, 0] : 1,
                opacity: phase === "reveal" ? [1, 1, 0] : 1,
                rotate: 0,
              }}
              transition={{
                scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.4, ease: "easeOut" },
                rotate: { duration: 0.8, ease: "easeOut" },
              }}
            >
              {/* Galaxy core glow */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                style={{
                  background: "radial-gradient(circle, #fff 0%, #a855f7 30%, #06b6d4 60%, transparent 100%)",
                  boxShadow: "0 0 30px 10px rgba(168, 85, 247, 0.5), 0 0 60px 20px rgba(6, 182, 212, 0.3)",
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Rotating galaxy spiral */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {galaxyStars.map((star) => (
                  <motion.div
                    key={star.id}
                    className="absolute rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: star.size,
                      height: star.size,
                      marginLeft: star.x,
                      marginTop: star.y,
                      background: star.id % 3 === 0 ? "#a855f7" : star.id % 3 === 1 ? "#06b6d4" : "#fff",
                      opacity: star.opacity,
                      boxShadow: `0 0 ${star.size * 2}px ${star.id % 3 === 0 ? "#a855f7" : star.id % 3 === 1 ? "#06b6d4" : "#fff"}`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: star.opacity }}
                    transition={{ delay: star.delay, duration: 0.3 }}
                  />
                ))}
              </motion.div>

              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, transparent 30%, rgba(168, 85, 247, 0.1) 50%, rgba(6, 182, 212, 0.1) 70%, transparent 100%)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Name reveal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold mb-2"
                style={{
                  background: "linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #a855f7 100%)",
                  backgroundSize: "200% 200%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Khalid Zainal
              </motion.h1>
              <motion.p
                className="text-dark-400 text-sm tracking-[0.3em] uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                Web Developer
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-8 w-48 h-[3px] rounded-full overflow-hidden bg-white/10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.3, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #06b6d4)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </motion.div>

            {/* Progress percentage */}
            <motion.span
              className="mt-2 text-xs text-dark-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.2 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Bottom gradient line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, #a855f7, #06b6d4, transparent)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
