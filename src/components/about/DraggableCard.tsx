/**
 * DraggableCard Component
 * Card that can be dragged with constrains and elastic effects
 */

import { motion } from "framer-motion";

interface DraggableCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DraggableCard({ children, className }: DraggableCardProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      dragElastic={0.1}
      whileDrag={{ scale: 1.05, cursor: "grabbing" }}
      className={`cursor-grab ${className}`}
    >
      {children}
    </motion.div>
  );
}
