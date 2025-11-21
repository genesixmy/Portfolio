"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <div style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          {isLoading && <Loading onComplete={() => setIsLoading(false)} />}
        </AnimatePresence>
      </div>

      <div style={{ position: "relative" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </>
  );
}
