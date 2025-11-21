"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
}

// SVG cursor as data URL - gradient arrow
const cursorSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23a855f7"/><stop offset="100%" stop-color="%2306b6d4"/></linearGradient></defs><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" fill="url(%23g)"/><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87c.48 0 .72-.58.38-.92L6.35 2.85a.5.5 0 0 0-.85.36Z" stroke="white" stroke-width="1.5"/></svg>`;

const cursorUrl = `data:image/svg+xml,${encodeURIComponent(cursorSvg)}`;

export default function Cursor() {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newEffect: ClickEffect = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setClickEffects((prev) => [...prev, newEffect]);

      setTimeout(() => {
        setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
      }, 600);
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      {/* Click effects only - cursor handled by CSS */}
      {clickEffects.map((effect) => (
        <motion.div
          key={effect.id}
          className="fixed pointer-events-none z-[9997]"
          style={{
            left: effect.x,
            top: effect.y,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary-400 bg-primary-400/20" />
        </motion.div>
      ))}

      {/* Glow effect on click */}
      {clickEffects.map((effect) => (
        <motion.div
          key={`glow-${effect.id}`}
          className="fixed pointer-events-none z-[9996]"
          style={{
            left: effect.x,
            top: effect.y,
          }}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, transparent 70%)",
            }}
          />
        </motion.div>
      ))}

      {/* Custom cursor via CSS - no delay */}
      <style jsx global>{`
        *, *::before, *::after {
          cursor: url('${cursorUrl}') 5 3, auto !important;
        }
      `}</style>
    </>
  );
}
