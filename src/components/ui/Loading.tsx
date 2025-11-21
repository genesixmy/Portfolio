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
    // Faster loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Faster increment
        const increment = Math.max(2, (100 - prev) / 5);
        return Math.min(100, prev + increment);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Faster transitions
      setTimeout(() => setPhase("reveal"), 150);
      setTimeout(() => setPhase("exit"), 600);
      setTimeout(() => onComplete(), 900);
    }
  }, [progress, onComplete]);

  // Floating particles - fewer for performance
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 2 + 1.5,
    delay: Math.random() * 1,
  }));

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
          {/* Ambient gradient orbs */}
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 70%)",
            }}
            animate={{
              x: [-30, 30, -30],
              y: [-20, 20, -20],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full opacity-30 blur-[120px]"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
            }}
            animate={{
              x: [30, -30, 30],
              y: [20, -20, 20],
            }}
            transition={{
              duration: 4,
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
                opacity: [0, 0.5, 0],
                y: [0, -15, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Planet animation */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: phase === "reveal" ? [1, 1.1, 0] : 1,
                opacity: phase === "reveal" ? [1, 1, 0] : 1,
              }}
              transition={{
                scale: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.4, ease: "easeOut" },
              }}
            >
              {/* Planet ring (Saturn-like) */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-10"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.3) 20%, rgba(6, 182, 212, 0.4) 50%, rgba(168, 85, 247, 0.3) 80%, transparent 100%)",
                  borderRadius: "50%",
                  transform: "translateX(-50%) translateY(-50%) rotateX(75deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Planet body */}
              <motion.div
                className="relative w-28 h-28 rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 25%, #06b6d4 75%, #0891b2 100%)",
                  boxShadow: "0 0 60px 15px rgba(168, 85, 247, 0.3), 0 0 100px 30px rgba(6, 182, 212, 0.15), inset -20px -20px 40px rgba(0, 0, 0, 0.4)",
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Planet surface texture */}
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `
                      radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                      radial-gradient(circle at 70% 60%, rgba(6, 182, 212, 0.4) 0%, transparent 40%),
                      radial-gradient(circle at 40% 70%, rgba(168, 85, 247, 0.3) 0%, transparent 30%)
                    `,
                  }}
                />

                {/* Surface bands */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-[20%] left-0 right-0 h-[2px] bg-white/30 blur-[1px]" />
                  <div className="absolute top-[40%] left-0 right-0 h-[3px] bg-cyan-400/40 blur-[2px]" />
                  <div className="absolute top-[60%] left-0 right-0 h-[2px] bg-purple-400/30 blur-[1px]" />
                  <div className="absolute top-[80%] left-0 right-0 h-[1px] bg-white/20" />
                </div>

                {/* Shine highlight */}
                <div
                  className="absolute top-3 left-4 w-8 h-8 rounded-full bg-white opacity-30 blur-md"
                />
                <div
                  className="absolute top-4 left-5 w-3 h-3 rounded-full bg-white opacity-60 blur-sm"
                />
              </motion.div>

              {/* Atmosphere glow */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, transparent 45%, rgba(6, 182, 212, 0.2) 50%, rgba(168, 85, 247, 0.15) 55%, transparent 60%)",
                  transform: "scale(1.15)",
                }}
              />

              {/* Orbiting moon */}
              <motion.div
                className="absolute w-3 h-3 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #e0e7ff 0%, #a5b4fc 50%, #6366f1 100%)",
                  boxShadow: "0 0 10px rgba(165, 180, 252, 0.5)",
                  top: "50%",
                  left: "50%",
                  marginTop: -6,
                  marginLeft: -6,
                }}
                animate={{
                  x: [70, -70, 70],
                  y: [0, 0, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 3,
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}
