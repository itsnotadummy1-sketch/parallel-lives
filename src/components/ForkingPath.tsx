"use client";

import { motion } from "framer-motion";

interface ForkingPathProps {
  chosenPath: "left" | "right";
  duration?: number;
  onComplete?: () => void;
}

export default function ForkingPath({
  chosenPath,
  duration = 1.5,
  onComplete,
}: ForkingPathProps) {
  const pathDuration = duration * 0.6;
  const glowDuration = duration * 0.4;

  return (
    <motion.div
      className="flex items-center justify-center w-full h-64"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onComplete}
    >
      <svg
        viewBox="0 0 400 200"
        className="w-full max-w-md h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#6b6b7b" />
            <stop offset="100%" stopColor="#7c5cbf" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M 200 200 L 200 120"
          stroke="#6b6b7b"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: pathDuration * 0.4, ease: "easeOut" }}
        />

        <motion.path
          d="M 200 120 Q 150 80, 100 40"
          stroke={chosenPath === "left" ? "#7c5cbf" : "#2a2a3a"}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            filter: chosenPath === "left" ? "url(#glow)" : "none",
          }}
          transition={{
            duration: pathDuration * 0.6,
            delay: pathDuration * 0.4,
            ease: "easeOut",
          }}
        />

        <motion.path
          d="M 200 120 Q 250 80, 300 40"
          stroke={chosenPath === "right" ? "#7c5cbf" : "#2a2a3a"}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0.3 }}
          animate={{
            pathLength: 1,
            opacity: 1,
            filter: chosenPath === "right" ? "url(#glow)" : "none",
          }}
          transition={{
            duration: pathDuration * 0.6,
            delay: pathDuration * 0.4,
            ease: "easeOut",
          }}
        />

        {chosenPath === "left" && (
          <motion.circle
            cx="100"
            cy="40"
            r="6"
            fill="#7c5cbf"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: glowDuration * 0.5,
              delay: pathDuration,
              ease: "easeOut",
            }}
          />
        )}

        {chosenPath === "right" && (
          <motion.circle
            cx="300"
            cy="40"
            r="6"
            fill="#7c5cbf"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: glowDuration * 0.5,
              delay: pathDuration,
              ease: "easeOut",
            }}
          />
        )}

        <motion.circle
          cx="200"
          cy="120"
          r="4"
          fill="#6b6b7b"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: pathDuration * 0.3 }}
        />
      </svg>
    </motion.div>
  );
}
