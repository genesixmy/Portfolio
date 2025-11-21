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
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Eased progress - starts fast, slows down near end
        const increment = Math.max(1, (100 - prev) / 10);
        return Math.min(100, prev + increment);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      // Start reveal phase
      setTimeout(() => setPhase("reveal"), 300);
      // Start exit phase
      setTimeout(() => setPhase("exit"), 1200);
      // Complete loading
      setTimeout(() => onComplete(), 1800);
    }
  }, [progress, onComplete]);

  // Generate constellation stars
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
    size: Math.random() * 3 + 1,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }));

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
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
            {/* Galaxy orb animation */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: phase === "reveal" ? [1, 1.2, 0] : 1,
                rotate: 0,
              }}
              transition={{
                scale: { duration: 0.8, ease: "easeOut" },
                rotate: { duration: 1.2, ease: "easeOut" },
              }}
            >
              {/* Outer ring */}
              <motion.div
                className="w-32 h-32 rounded-full border-2 border-transparent"
                style={{
                  background: "linear-gradient(135deg, transparent, transparent) padding-box, linear-gradient(135deg, #a855f7, #06b6d4, #a855f7) border-box",
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Inner orb */}
              <motion.div
                className="absolute inset-4 rounded-full"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #a855f7 0%, #7c3aed 30%, #06b6d4 70%, #0891b2 100%)",
                  boxShadow: "0 0 40px 10px rgba(168, 85, 247, 0.4), 0 0 80px 20px rgba(6, 182, 212, 0.2), inset 0 0 30px rgba(255, 255, 255, 0.1)",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Shine effect */}
                <div
                  className="absolute top-2 left-3 w-6 h-6 rounded-full bg-white opacity-40 blur-sm"
                />
              </motion.div>

              {/* Orbiting particles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i === 0 ? "#a855f7" : i === 1 ? "#06b6d4" : "#f0abfc",
                    boxShadow: `0 0 10px ${i === 0 ? "#a855f7" : i === 1 ? "#06b6d4" : "#f0abfc"}`,
                    top: "50%",
                    left: "50%",
                    marginTop: -4,
                    marginLeft: -4,
                  }}
                  animate={{
                    x: [
                      Math.cos((i * 2 * Math.PI) / 3) * 70,
                      Math.cos((i * 2 * Math.PI) / 3 + Math.PI) * 70,
                      Math.cos((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 70,
                    ],
                    y: [
                      Math.sin((i * 2 * Math.PI) / 3) * 70,
                      Math.sin((i * 2 * Math.PI) / 3 + Math.PI) * 70,
                      Math.sin((i * 2 * Math.PI) / 3 + 2 * Math.PI) * 70,
                    ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </motion.div>

            {/* Name reveal */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                  duration: 3,
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
                transition={{ delay: 0.5 }}
              >
                Web Developer
              </motion.p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="mt-8 w-48 h-1 rounded-full overflow-hidden bg-white/10"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #06b6d4)",
                  width: `${progress}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>

            {/* Progress percentage */}
            <motion.span
              className="mt-3 text-xs text-dark-500 font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
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
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
