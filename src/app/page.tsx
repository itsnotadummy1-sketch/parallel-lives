"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const WHAT_IF_PROMPTS = [
  "What if you moved to a different country at 22?",
  "What if you never took that first job?",
  "What if you said yes to the opportunity you turned down?",
  "What if you pursued art instead of stability?",
  "What if you never moved to the city?",
  "What if you dropped out and started a company at 19?",
  "What if you followed your first love across the world?",
];

function getDailyPrompt(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return WHAT_IF_PROMPTS[dayOfYear % WHAT_IF_PROMPTS.length];
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [birthdate, setBirthdate] = useState("");
  const dailyPrompt = getDailyPrompt();

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <div className="absolute inset-0 flex pointer-events-none">
        <div className="flex-1 bg-[#0a0a0f]" />
        <div className="flex-1 bg-[#0c0b12]" />
      </div>

      <motion.div
        className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 z-10"
        style={{ background: "linear-gradient(to bottom, transparent, #7c5cbf, transparent)" }}
        animate={{
          opacity: [0.3, 0.8, 0.3],
          boxShadow: [
            "0 0 8px rgba(124,92,191,0.2)",
            "0 0 20px rgba(124,92,191,0.6)",
            "0 0 8px rgba(124,92,191,0.2)",
          ],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute top-6 left-6 md:left-10 z-20">
        <span className="text-[#6b6b7b] text-sm tracking-widest uppercase font-mono">
          your life
        </span>
      </div>
      <div className="absolute top-6 right-6 md:right-10 z-20">
        <span className="text-[#7c5cbf] text-sm tracking-widest uppercase font-mono">
          another life
        </span>
      </div>

      <main className="relative z-20 flex flex-col flex-1 items-center justify-center px-6 py-20">
        <motion.div
          className="text-center max-w-3xl"
          variants={{
            visible: { transition: { staggerChildren: 0.3 } },
          }}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          >
            <span className="text-[#e0e0e0]">Who would you be if you </span>
            <span className="text-[#7c5cbf]">chose differently?</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl text-[#9a9aab] mb-10"
          >
            Explore the life you didn&apos;t live.
          </motion.p>

          <motion.div variants={fadeUp} transition={{ duration: 0.8, ease: "easeOut" }}>
            <a
              href="/questionnaire"
              className="inline-block px-8 py-4 bg-[#7c5cbf] text-white rounded-lg font-semibold text-lg hover:bg-[#5a3d9e] transition-colors hover:scale-105 transform"
            >
              Meet your parallel self
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-[#12121a] border border-[#2a2a3a] rounded-xl p-6 md:p-8">
            <p className="text-[#7c5cbf] text-sm uppercase tracking-widest mb-3 font-mono">
              today&apos;s what if
            </p>
            <p className="text-[#e0e0e0] text-xl md:text-2xl font-medium leading-snug">
              {dailyPrompt}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 w-full max-w-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <label htmlFor="birthdate" className="block text-[#9a9aab] text-sm mb-2 font-mono">
            When were you born?
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-4 py-3 bg-[#12121a] border border-[#2a2a3a] rounded-lg text-[#e0e0e0] focus:outline-none focus:border-[#7c5cbf] focus:ring-1 focus:ring-[#7c5cbf] transition-colors font-mono"
          />
        </motion.div>
      </main>

      <footer className="relative z-20 py-8 text-center border-t border-[#2a2a3a]">
        <p className="text-[#6b6b7b] text-sm font-mono">
          Parallel Lives
        </p>
        <p className="text-[#4a4a5a] text-xs mt-1">
          Every choice creates a universe.
        </p>
      </footer>
    </div>
  );
}
