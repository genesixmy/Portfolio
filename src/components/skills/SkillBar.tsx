/**
 * SkillBar Component
 * Animated skill proficiency bar with level indicator
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number; // 0-100
  delay?: number;
}

/**
 * Displays an animated skill proficiency bar
 * @param name - Skill name
 * @param level - Proficiency level (0-100)
 * @param delay - Animation delay in seconds
 */
export function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-dark-200">{name}</span>
        <span className="text-sm text-primary-400">{level}%</span>
      </div>
      <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
        />
      </div>
    </div>
  );
}
