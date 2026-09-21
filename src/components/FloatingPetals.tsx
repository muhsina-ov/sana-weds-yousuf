import { useMemo } from "react";
import { motion } from "framer-motion";

type PetalKind = "gold-petal" | "gold-shimmer" | "red-rose" | "red-rose-soft";

type FloralParticle = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
  rotate: number;
  kind: PetalKind;
};

/** Falling celebration particles: regal red rose petals, golden petals & gold leaf shimmers */
export default function FloatingPetals({ count = 30 }: { count?: number }) {
  const petals = useMemo<FloralParticle[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Distribute: ~40% Red rose petals, ~40% Golden petals, ~20% Gold shimmers
        let kind: PetalKind;
        const mod = i % 5;
        if (mod === 0 || mod === 3) {
          kind = i % 2 === 0 ? "red-rose" : "red-rose-soft";
        } else if (mod === 1 || mod === 4) {
          kind = "gold-petal";
        } else {
          kind = "gold-shimmer";
        }

        const isRed = kind === "red-rose" || kind === "red-rose-soft";
        const isShimmer = kind === "gold-shimmer";

        return {
          id: i,
          left: (i * 17 + 3) % 100,
          delay: (i % 9) * 0.7,
          duration: 8.5 + (i % 6) * 1.5,
          size: isShimmer
            ? 5 + (i % 3) * 2
            : isRed
            ? 11 + (i % 4) * 3
            : 8 + (i % 4) * 2.5,
          drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 14),
          opacity: isRed
            ? 0.7 + (i % 3) * 0.12
            : isShimmer
            ? 0.75 + (i % 3) * 0.1
            : 0.55 + (i % 4) * 0.12,
          rotate: (i % 2 === 0 ? 1 : -1) * (45 + (i % 6) * 25),
          kind,
        };
      }),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[8] overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => {
        const isRed = p.kind === "red-rose" || p.kind === "red-rose-soft";
        const isShimmer = p.kind === "gold-shimmer";

        return (
          <span
            key={p.id}
            className={`absolute top-[-10%] ${
              isShimmer
                ? "rounded-full shadow-[0_0_10px_rgba(255,223,128,0.7)]"
                : isRed
                ? "rounded-[60%_40%_65%_35%] shadow-[0_4px_12px_rgba(139,0,0,0.35)]"
                : "rounded-[45%_55%_65%_35%] shadow-[0_3px_8px_rgba(212,175,55,0.35)]"
            }`}
            style={{
              left: `${p.left}%`,
              width: isShimmer ? p.size * 0.6 : p.size,
              height: isShimmer
                ? p.size * 0.6
                : isRed
                ? p.size * 1.25
                : p.size * 1.4,
              opacity: p.opacity,
              background: isShimmer
                ? "radial-gradient(circle, #fff7d6 0%, #ffd700 70%, #d4af37 100%)"
                : p.kind === "red-rose"
                ? "radial-gradient(ellipse at 35% 25%, #d11a2a 0%, #a30818 45%, #680008 85%, #420004 100%)"
                : p.kind === "red-rose-soft"
                ? "radial-gradient(ellipse at 30% 30%, #e23b49 0%, #b81424 50%, #7d0210 100%)"
                : "linear-gradient(135deg, #fff3c4 0%, #ffd700 30%, #dfb15b 60%, #b8860b 100%)",
              filter: isRed ? "drop-shadow(0 2px 5px rgba(100,0,10,0.3))" : undefined,
              animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
              ["--drift" as string]: `${p.drift}px`,
              ["--spin" as string]: `${p.rotate}deg`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Cursor-following soft warm golden light orb in the hero */
export function CursorGlow({
  x,
  y,
}: {
  x: number;
  y: number;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-[6] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      aria-hidden
      animate={{
        left: `${50 + x * 28}%`,
        top: `${42 + y * 22}%`,
      }}
      transition={{ type: "spring", stiffness: 60, damping: 18, mass: 0.6 }}
      style={{
        background:
          "radial-gradient(circle, rgba(255,248,220,0.55) 0%, rgba(245,215,140,0.2) 45%, transparent 70%)",
      }}
    />
  );
}
