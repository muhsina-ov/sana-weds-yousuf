import { useState } from "react";
import { motion } from "framer-motion";
import { wedding } from "../config";

const ease: [number, number, number, number] = [0.65, 0, 0.35, 1];

/** Soft paper curtain that parts to reveal the invitation */
export default function IntroGate({
  onOpening,
  onOpened,
}: {
  onOpening: () => void;
  onOpened: () => void;
}) {
  const [opening, setOpening] = useState(false);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpening();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      {/* Left paper panel */}
      <motion.div
        className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(110deg, #efe6d8 0%, #f6f0e6 45%, #ebe2d4 100%)",
        }}
        animate={opening ? { x: "-105%" } : { x: 0 }}
        transition={{ duration: 1.35, delay: 0.25, ease }}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* Right paper panel */}
      <motion.div
        className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
        style={{
          background:
            "linear-gradient(250deg, #efe6d8 0%, #f6f0e6 45%, #ebe2d4 100%)",
        }}
        animate={opening ? { x: "105%" } : { x: 0 }}
        transition={{ duration: 1.35, delay: 0.25, ease }}
        onAnimationComplete={() => opening && onOpened()}
      >
        <div className="absolute inset-0 opacity-40 mix-blend-multiply"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
      </motion.div>

      {/* Soft light seam */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-16 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)",
          filter: "blur(8px)",
        }}
        initial={{ opacity: 0, scaleX: 0.15 }}
        animate={
          opening
            ? { opacity: [0, 1, 0], scaleX: [0.15, 1.4, 2.4] }
            : { opacity: 0.35, scaleX: 0.4 }
        }
        transition={{ duration: 1.35, delay: 0.25, ease }}
      />

      {/* Center call-to-open */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center"
        animate={opening ? { opacity: 0, scale: 0.96, filter: "blur(6px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="font-display text-[11px] uppercase tracking-[0.42em] text-[#6e6256]"
        >
          An invitation
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-script text-5xl text-[#1a1814] sm:text-6xl"
        >
          {wedding.bride} & {wedding.groom}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-3 max-w-xs font-display text-base italic leading-relaxed text-[#5c5146]"
        >
          Open gently — a celebration of love awaits
        </motion.p>
        <motion.button
          type="button"
          onClick={handleOpen}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7 }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#d4af37]/40 bg-[#1a1814] px-8 py-3.5 text-[11px] uppercase tracking-[0.28em] text-[#f6f0e6] shadow-[0_16px_40px_rgba(40,30,20,0.18)] transition-all duration-500 ease-out hover:border-[#d4af37] hover:shadow-[0_22px_55px_rgba(212,175,55,0.25)]"
        >
          Open invitation
          <motion.span
            className="flex h-7 w-7 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#f6f0e6]"
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
