import { motion } from "framer-motion";
import Reveal, { ParallaxBlock, Stagger, staggerItem } from "../components/Reveal";
import FloralMotif from "../components/FloralMotif";
import { wedding } from "../config";

export default function InviteMessage() {
  const words = wedding.verse.text.split(" ");

  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1a1814]/12 to-transparent" />

      {/* Red Rose & Golden leaf botanical watermark accent */}
      <ParallaxBlock speed={0.24} className="pointer-events-none absolute -left-8 top-12 opacity-[0.45] sm:left-4">
        <FloralMotif size={135} className="-rotate-45" />
      </ParallaxBlock>

      {/* Soft floating bouquet watermark */}
      <ParallaxBlock speed={0.22} className="pointer-events-none absolute -right-8 top-10 opacity-[0.22] sm:right-8">
        <img
          src="/assets/layers/layer-05-bouquet.png"
          alt="Golden Floral Accent"
          className="w-40 rotate-12 sm:w-52"
        />
        <div className="absolute -left-4 -top-4">
          <FloralMotif size={85} className="rotate-12" opacity={0.8} />
        </div>
      </ParallaxBlock>

      <Reveal className="mx-auto flex max-w-md flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-sm leading-relaxed tracking-wide text-[#6e6256]"
        >
          {wedding.verse.arabic}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 h-px w-16 origin-center bg-[#1a1814]/20"
        />

        <Stagger className="mt-8 flex flex-wrap justify-center gap-x-1.5 gap-y-1" stagger={0.035}>
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              variants={staggerItem}
              className="font-display text-[1.35rem] leading-[1.55] text-[#2c261f] sm:text-[1.5rem]"
            >
              {word}
            </motion.span>
          ))}
        </Stagger>

        <Stagger className="mt-10 flex flex-col gap-1" stagger={0.12}>
          <motion.p
            variants={staggerItem}
            className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d60]"
          >
            {wedding.groomParents}
          </motion.p>
          <motion.p
            variants={staggerItem}
            className="text-[11px] uppercase tracking-[0.28em] text-[#7a6d60]"
          >
            {wedding.brideParents}
          </motion.p>
        </Stagger>
      </Reveal>
    </section>
  );
}
