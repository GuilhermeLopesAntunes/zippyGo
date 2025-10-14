"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

interface BalloonProps {
  text: string;
  position?: "left" | "right"; // setinha à esquerda ou direita
}

export function BalloonTyping({ text, position = "left" }: BalloonProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  const arrowPosition =
    position === "left"
      ? "left-[-6px] top-1/2 -translate-y-1/2 rotate-45"
      : "right-[-6px] top-1/2 -translate-y-1/2 rotate-45";

  return (
    <div className="relative inline-block" ref={ref}>
      {/* Balão */}
      <div className="text-xs xl:w-200 md:text-xl text-gray-700 px-4 py-4 md:py-8 md:px-6 xl:px-8 xl:py-8 rounded-2xl shadow-md border-3 border-[#D5D5D5] bg-white">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.01, delay: index * 0.02 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      {/* Setinha */}
      <div
        className={`absolute w-3 h-3 bg-white border-[#D5D5D5] border-3 border-r-0 border-t-0 shadow-md ${arrowPosition}`}
      ></div>
    </div>
  );
}
