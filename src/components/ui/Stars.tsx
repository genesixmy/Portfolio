"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function Stars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate random stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 150; // Number of stars

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1, // 1-3px
          duration: Math.random() * 3 + 2, // 2-5s twinkle duration
          delay: Math.random() * 5, // Random delay
          opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8 base opacity
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Static star layer */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting stars (occasional) */}
      <ShootingStar />
      <ShootingStar delay={7} />
      <ShootingStar delay={15} />
    </div>
  );
}

function ShootingStar({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: "2px",
        height: "2px",
      }}
      initial={{
        top: "5%",
        left: "70%",
        opacity: 0,
      }}
      animate={{
        top: ["5%", "70%"],
        left: ["70%", "20%"],
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 1.2,
        delay: delay,
        repeat: Infinity,
        repeatDelay: 8 + Math.random() * 12,
        ease: "easeIn",
      }}
    >
      {/* Star head */}
      <div
        className="absolute w-1 h-1 bg-white rounded-full"
        style={{
          boxShadow: "0 0 6px 2px rgba(255, 255, 255, 0.8)",
        }}
      />
      {/* Trail - pointing behind (up-right) as star falls down-left */}
      <div
        className="absolute top-0 left-0 w-16 h-[2px] origin-left"
        style={{
          transform: "rotate(-52deg)",
          background: "linear-gradient(to right, rgba(255,255,255,0.8), transparent)",
        }}
      />
    </motion.div>
  );
}
