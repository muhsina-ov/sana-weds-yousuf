import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { useLocalTilt } from "../hooks/useParallax";
import { wedding } from "../config";

type Parts = { days: number; hours: number; mins: number; secs: number };

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

function Tick({ value }: { value: number }) {
  const label = String(value).padStart(2, "0");
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={label}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block tabular-nums"
        >
          {label}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function CountCell({
  label,
  value,
  delay,
}: {
  label: string;
  value: number;
  delay: number;
}) {
  const { ref, style } = useLocalTilt(7);

  return (
    <motion.div
      ref={ref}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="rounded-[1.35rem] bg-[rgba(26,24,20,0.03)] px-2 py-5 ring-1 ring-[rgba(26,24,20,0.08)] transition-shadow duration-500 hover:shadow-[0_18px_40px_rgba(60,45,30,0.1)]"
    >
      <p className="font-display text-3xl text-[#1a1814] sm:text-4xl">
        <Tick value={value} />
      </p>
      <p className="mt-2 text-[9px] uppercase tracking-[0.28em] text-[#7a6d60]">
        {label}
      </p>
    </motion.div>
  );
}

export default function CountdownSection() {
  const target = new Date(wedding.dateISO).getTime();
  const [parts, setParts] = useState<Parts>(() => getParts(target));

  useEffect(() => {
    const id = window.setInterval(() => setParts(getParts(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { label: "Days", value: parts.days },
    { label: "Hours", value: parts.hours },
    { label: "Mins", value: parts.mins },
    { label: "Secs", value: parts.secs },
  ];

  return (
    <section className="relative px-6 py-20">
      <Reveal className="mx-auto max-w-lg text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Counting the moments
        </p>
        <h2 className="mt-3 font-script text-5xl text-[#1a1814]">Until we waltz</h2>
        <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-4">
          {cells.map((c, i) => (
            <CountCell
              key={c.label}
              label={c.label}
              value={c.value}
              delay={i * 0.07}
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
