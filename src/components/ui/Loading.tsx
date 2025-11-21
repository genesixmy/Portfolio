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
      setTimeout(() => setPhase("reveal"), 200);
      setTimeout(() => setPhase("exit"), 700);
      setTimeout(() => onComplete(), 1000);
    }
  }, [progress, onComplete]);

  // Only 5 constellation stars
  const constellationStars = [
    { x: 12, y: 18, delay: 0, size: 1.5 },
    { x: 88, y: 12, delay: 0.1, size: 1.2 },
    { x: 20, y: 82, delay: 0.2, size: 1.3 },
    { x: 85, y: 78, delay: 0.15, size: 1.5 },
    { x: 50, y: 8, delay: 0.25, size: 1 },
  ];

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "radial-gradient(ellipse at center, #12121f 0%, #0a0a12 40%, #050508 100%)",
          }}
        >
          {/* Deep space ambient glow */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-10 blur-[150px]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 60%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[150px]"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 60%)",
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          {/* 5 Constellation stars */}
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
                opacity: [0.2, 0.8, 0.2],
                scale: 1,
              }}
              transition={{
                duration: 3,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="rounded-full bg-white"
                style={{
                  width: star.size * 3,
                  height: star.size * 3,
                  boxShadow: `0 0 ${star.size * 6}px ${star.size}px rgba(255, 255, 255, 0.5), 0 0 ${star.size * 12}px ${star.size * 2}px rgba(168, 85, 247, 0.15)`,
                }}
              />
            </motion.div>
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Name reveal */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: phase === "reveal" ? [1, 0] : 1,
                y: phase === "reveal" ? [0, -20] : 0
              }}
              transition={{
                duration: phase === "reveal" ? 0.4 : 0.6,
                delay: phase === "reveal" ? 0 : 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-display font-bold mb-4"
                style={{
                  background: "linear-gradient(135deg, #e9d5ff 0%, #a855f7 25%, #06b6d4 75%, #a5f3fc 100%)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Khalid Zainal
              </motion.h1>
              <motion.p
                className="text-dark-400 text-sm tracking-[0.5em] uppercase font-light"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Web Developer
              </motion.p>
            </motion.div>

            {/* Webflow-style loader - horizontal expanding lines */}
            <motion.div
              className="relative w-72 md:w-96"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {/* Background track */}
              <div className="relative h-[1px] bg-white/10 overflow-hidden">
                {/* Progress fill - expands from center */}
                <motion.div
                  className="absolute top-0 h-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, #a855f7, #06b6d4, transparent)",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>

              {/* Animated glow line that sweeps */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden"
                style={{ opacity: progress < 100 ? 1 : 0 }}
              >
                <motion.div
                  className="absolute top-0 w-20 h-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.8), rgba(6, 182, 212, 0.8), transparent)",
                  }}
                  animate={{
                    left: ["-20%", "100%"],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>

              {/* Percentage display */}
              <div className="flex justify-between items-center mt-4">
                <motion.span
                  className="text-[11px] text-dark-500/50 font-mono tracking-wider"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  LOADING
                </motion.span>
                <motion.span
                  className="text-[11px] text-dark-400/70 font-mono tabular-nums"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {Math.round(progress)}%
                </motion.span>
              </div>
            </motion.div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[1px]"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(168, 85, 247, 0.3) 30%, rgba(6, 182, 212, 0.3) 70%, transparent 100%)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
