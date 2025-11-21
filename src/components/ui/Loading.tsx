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

  // Only 5 constellation stars
  const constellationStars = [
    { x: 15, y: 20, delay: 0, size: 2 },
    { x: 85, y: 15, delay: 0.1, size: 1.5 },
    { x: 25, y: 75, delay: 0.2, size: 1.5 },
    { x: 80, y: 70, delay: 0.15, size: 2 },
    { x: 50, y: 10, delay: 0.25, size: 1 },
  ];

  // Galaxy spiral - multiple arms for realistic look
  const createSpiralArm = (armOffset: number, starCount: number) => {
    return Array.from({ length: starCount }, (_, i) => {
      const angle = (i / starCount) * Math.PI * 2.5 + armOffset;
      const radius = 8 + (i / starCount) * 55;
      const spread = Math.sin(i * 0.8) * 3;
      return {
        id: `${armOffset}-${i}`,
        x: Math.cos(angle) * (radius + spread),
        y: Math.sin(angle) * (radius + spread) * 0.6, // Flatten for perspective
        size: 1 + Math.random() * 1.5,
        opacity: 0.4 + (1 - i / starCount) * 0.6,
        delay: i * 0.015,
        color: i % 4 === 0 ? "#a855f7" : i % 4 === 1 ? "#06b6d4" : i % 4 === 2 ? "#f0abfc" : "#fff",
      };
    });
  };

  // Create 3 spiral arms
  const galaxyArms = [
    ...createSpiralArm(0, 25),
    ...createSpiralArm(Math.PI * 0.66, 25),
    ...createSpiralArm(Math.PI * 1.33, 25),
  ];

  // Dust particles around galaxy
  const dustParticles = Array.from({ length: 40 }, (_, i) => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 20 + Math.random() * 40;
    return {
      id: i,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.6,
      size: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.3 + 0.1,
    };
  });

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: "radial-gradient(ellipse at center, #12121f 0%, #0a0a12 40%, #050508 100%)",
          }}
        >
          {/* Deep space ambient glow */}
          <motion.div
            className="absolute w-[800px] h-[800px] rounded-full opacity-15 blur-[150px]"
            style={{
              background: "radial-gradient(circle, #a855f7 0%, transparent 60%)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.2, 0.15],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full opacity-15 blur-[150px]"
            style={{
              background: "radial-gradient(circle, #06b6d4 0%, transparent 60%)",
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.15, 0.2, 0.15],
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
                opacity: [0.3, 1, 0.3],
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
                  width: star.size * 4,
                  height: star.size * 4,
                  boxShadow: `0 0 ${star.size * 8}px ${star.size * 2}px rgba(255, 255, 255, 0.6), 0 0 ${star.size * 15}px ${star.size * 4}px rgba(168, 85, 247, 0.2)`,
                }}
              />
            </motion.div>
          ))}

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Galaxy system */}
            <motion.div
              className="relative mb-10 w-40 h-40"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: phase === "reveal" ? [1, 1.3, 0] : 1,
                opacity: phase === "reveal" ? [1, 0.8, 0] : 1,
              }}
              transition={{
                scale: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.5, ease: "easeOut" },
              }}
            >
              {/* Galaxy core - bright center */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Core outer glow */}
                <div
                  className="absolute -inset-4 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(6, 182, 212, 0.2) 40%, transparent 70%)",
                    filter: "blur(8px)",
                  }}
                />
                {/* Core middle */}
                <div
                  className="absolute -inset-2 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(255, 255, 255, 0.8) 0%, rgba(168, 85, 247, 0.6) 30%, transparent 70%)",
                    filter: "blur(4px)",
                  }}
                />
                {/* Core bright center */}
                <div
                  className="w-6 h-6 rounded-full"
                  style={{
                    background: "radial-gradient(circle, #fff 0%, #e9d5ff 40%, #a855f7 80%, transparent 100%)",
                    boxShadow: "0 0 20px 8px rgba(255, 255, 255, 0.5), 0 0 40px 15px rgba(168, 85, 247, 0.4), 0 0 60px 25px rgba(6, 182, 212, 0.2)",
                  }}
                />
              </motion.div>

              {/* Rotating galaxy spiral arms */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                {/* Dust particles */}
                {dustParticles.map((dust) => (
                  <div
                    key={dust.id}
                    className="absolute rounded-full"
                    style={{
                      left: "50%",
                      top: "50%",
                      width: dust.size,
                      height: dust.size,
                      marginLeft: dust.x,
                      marginTop: dust.y,
                      background: "rgba(168, 85, 247, 0.5)",
                      opacity: dust.opacity,
                    }}
                  />
                ))}

                {/* Spiral arm stars */}
                {galaxyArms.map((star) => (
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
                      background: star.color,
                      boxShadow: `0 0 ${star.size * 3}px ${star.color}`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: star.opacity, scale: 1 }}
                    transition={{ delay: star.delay, duration: 0.4, ease: "easeOut" }}
                  />
                ))}
              </motion.div>

              {/* Galaxy outer halo */}
              <motion.div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, transparent 40%, rgba(168, 85, 247, 0.08) 60%, rgba(6, 182, 212, 0.05) 80%, transparent 100%)",
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.6, 1, 0.6],
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-display font-bold mb-3"
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
                className="text-dark-400 text-sm tracking-[0.4em] uppercase font-light"
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 0.8, letterSpacing: "0.4em" }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Web Developer
              </motion.p>
            </motion.div>

            {/* Progress bar - minimal elegant design */}
            <motion.div
              className="mt-10 w-56 h-[2px] rounded-full overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #a855f7, #06b6d4, #a855f7)",
                  backgroundSize: "200% 100%",
                  width: `${progress}%`,
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "100% 0%"],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />
            </motion.div>

            {/* Progress percentage - subtle */}
            <motion.span
              className="mt-3 text-[10px] text-dark-500/60 font-mono tracking-widest"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
