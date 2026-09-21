import { motion } from "framer-motion";
import Reveal, { ParallaxBlock } from "../components/Reveal";
import { useLocalTilt } from "../hooks/useParallax";
import FloralMotif from "../components/FloralMotif";
import { wedding } from "../config";

export default function Events() {
  const e = wedding.events[0];
  const { ref, style } = useLocalTilt(6);

  return (
    <section className="relative overflow-hidden px-6 py-24">
      <ParallaxBlock
        speed={0.18}
        className="pointer-events-none absolute -left-10 top-24 opacity-[0.08]"
      >
        <img
          src="/assets/layers/layer-couple.png"
          alt=""
          className="w-56 -scale-x-100 sm:w-72"
        />
      </ParallaxBlock>

      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          The ceremony
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">{e.name}</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
      </Reveal>

      <Reveal className="relative mx-auto max-w-md">
        <motion.div
          ref={ref}
          style={style}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] bg-[#fffaf4]/70 px-6 pb-10 pt-12 text-center shadow-[0_30px_80px_rgba(60,45,30,0.08)] ring-1 ring-[rgba(26,24,20,0.08)]"
        >
          <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] ring-1 ring-[rgba(26,24,20,0.06)]" />

          {/* Soft light sweep on hover */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ animation: "dress-shimmer 4.5s ease-in-out infinite" }}
          />

          <p className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
            {e.dayLabel}
          </p>
          <motion.p
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-display text-8xl font-medium leading-none text-[#1a1814]"
          >
            {e.dayNum}
          </motion.p>
          <p className="mt-2 font-display text-xl tracking-[0.18em] text-[#4a4036]">
            {e.monthLabel}
          </p>

          <div className="mx-auto mt-7 h-px w-20 bg-[#1a1814]/15" />

          <p className="mt-7 font-display text-2xl text-[#1a1814]">{e.time}</p>
          <p className="mt-2 text-sm tracking-wide text-[#5c5146]">{e.venue}</p>
          <p className="mx-auto mt-4 max-w-xs font-display text-base italic leading-relaxed text-[#6e6256]">
            {e.note}
          </p>

          <div className="mt-6 flex justify-center">
            <FloralMotif size={70} className="opacity-75" />
          </div>
        </motion.div>

        <div className="relative mx-auto mt-12 max-w-xs">
          <p className="mb-7 text-center text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
            The day unfolds
          </p>
          <div className="relative">
            <motion.div
              className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-gradient-to-b from-[#1a1814]/30 via-[#1a1814]/15 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="flex flex-col gap-6">
              {wedding.program.map((step, i) => (
                <motion.div
                  key={step.name}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: 0.15 + i * 0.09,
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ x: 4 }}
                  className="flex cursor-default items-start gap-4 pl-1"
                >
                  <motion.span
                    className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#1a1814]/70 ring-4 ring-[#f3ede3]"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.09,
                      type: "spring",
                      stiffness: 320,
                      damping: 18,
                    }}
                  />
                  <div className="flex flex-1 items-baseline justify-between gap-3">
                    <p className="font-display text-lg text-[#2c261f]">{step.name}</p>
                    <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[#7a6d60]">
                      {step.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
