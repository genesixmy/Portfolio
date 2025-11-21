/**
 * MoodSelector Component
 * Interactive mood/status selector with animated icons
 */

import { useState } from "react";
import { motion } from "framer-motion";

interface Mood {
  icon: string;
  label: string;
  color: string;
}

const moods: Mood[] = [
  {
    icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z",
    label: "On Fire",
    color: "from-orange-500 to-red-500"
  },
  {
    icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    label: "Creative",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    label: "Productive",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    label: "Coding",
    color: "from-primary-500 to-accent-500"
  },
];

export function MoodSelector() {
  const [selected, setSelected] = useState(2);

  return (
    <div className="glass-card">
      <div className="flex items-center gap-2 mb-3">
        <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-dark-400">Status hari ini:</p>
      </div>
      <div className="flex gap-2">
        {moods.map((mood, index) => (
          <motion.button
            key={mood.label}
            onClick={() => setSelected(index)}
            className={`relative flex-1 p-3 rounded-xl text-center transition-all ${
              selected === index
                ? `bg-gradient-to-br ${mood.color} text-white`
                : "bg-white/5 hover:bg-white/10 text-dark-400"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={mood.icon} />
            </svg>
            <span className="text-xs">{mood.label}</span>
            {selected === index && (
              <motion.div
                layoutId="moodIndicator"
                className="absolute inset-0 rounded-xl border-2 border-white/50"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
