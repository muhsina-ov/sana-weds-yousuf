import { useState } from "react";
import { motion } from "framer-motion";
import Reveal, { ParallaxBlock } from "../components/Reveal";
import { wedding } from "../config";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText(wedding.hashtag);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <footer className="relative overflow-hidden px-6 pb-16 pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a1814]/12 to-transparent" />

      {/* Soft couple silhouette fade */}
      <ParallaxBlock
        speed={0.15}
        className="pointer-events-none absolute inset-x-0 bottom-0 top-8 opacity-[0.08]"
      >
        <img
          src="/assets/layers/layer-couple.png"
          alt=""
          className="mx-auto h-full max-w-md object-contain object-bottom"
        />
      </ParallaxBlock>

      <div className="relative z-10 mb-10 overflow-hidden py-3">
        <div
          className="flex w-max whitespace-nowrap"
          style={{ animation: "marquee 28s linear infinite" }}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="font-display px-4 text-sm uppercase tracking-[0.36em] text-[#8a7a68]"
            >
              {Array(5)
                .fill(`${wedding.hashtag}  ·  ${wedding.dateLabel}  ·  `)
                .join("")}
            </span>
          ))}
        </div>
      </div>

      <Reveal className="relative z-10 mx-auto flex max-w-sm flex-col items-center gap-5 text-center">
        <p className="font-script text-4xl leading-snug text-[#1a1814] sm:text-5xl">
          We can't wait to celebrate with you
        </p>
        <p className="text-[11px] uppercase tracking-[0.32em] text-[#7a6d60]">
          With love, the Qureshi & Fatima families
        </p>
        <div className="h-px w-28 bg-[#1a1814]/15" />
        <motion.button
          type="button"
          onClick={copyHashtag}
          whileTap={{ scale: 0.96 }}
          className={`rounded-full border px-5 py-2 text-[10px] tracking-[0.2em] transition-colors duration-500 ${
            copied
              ? "border-[#1a1814]/35 bg-[#1a1814]/5 text-[#1a1814]"
              : "border-[#1a1814]/12 text-[#7a6d60] hover:border-[#1a1814]/25 hover:text-[#2c261f]"
          }`}
        >
          {copied ? "Copied ✓" : `${wedding.hashtag} · tap to copy`}
        </motion.button>
        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-2 text-[10px] uppercase tracking-[0.35em] text-[#8a7a68] transition-colors hover:text-[#1a1814]"
        >
          Follow @invitestory.in on Instagram
        </a>
      </Reveal>
    </footer>
  );
}
