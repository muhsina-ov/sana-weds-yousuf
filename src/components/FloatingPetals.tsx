import { useMemo } from "react";
import { motion } from "framer-motion";

type PetalKind = "gold-petal" | "gold-petal-soft" | "gold-shimmer";

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

/** Falling celebration particles: golden petals & gold leaf shimmers only */
export default function FloatingPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo<FloralParticle[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const mod = i % 3;
        const kind: PetalKind =
          mod === 0 ? "gold-petal" : mod === 1 ? "gold-petal-soft" : "gold-shimmer";
        const isShimmer = kind === "gold-shimmer";

        return {
          id: i,
          left: (i * 19 + 5) % 100,
          delay: (i % 7) * 0.8,
          duration: 9 + (i % 5) * 1.6,
          size: isShimmer ? 5 + (i % 3) * 2 : 9 + (i % 3) * 2.5,
          drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 12),
          opacity: isShimmer ? 0.75 + (i % 3) * 0.1 : 0.55 + (i % 3) * 0.12,
          rotate: (i % 2 === 0 ? 1 : -1) * (35 + (i % 5) * 20),
          kind,
        };
      }),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[8] overflow-hidden"
      aria-hidden
      style={{ contain: "strict" }}
    >
      {petals.map((p) => {
        const isShimmer = p.kind === "gold-shimmer";
        const isSoft = p.kind === "gold-petal-soft";

        return (
          <span
            key={p.id}
            className={`absolute top-[-8%] will-change-transform ${
              isShimmer
                ? "rounded-full shadow-[0_0_8px_rgba(255,223,128,0.6)]"
                : "rounded-[45%_55%_65%_35%] shadow-[0_3px_8px_rgba(212,175,55,0.3)]"
            }`}
            style={{
              left: `${p.left}%`,
              width: isShimmer ? p.size * 0.7 : p.size,
              height: isShimmer ? p.size * 0.7 : p.size * 1.35,
              opacity: p.opacity,
              background: isShimmer
                ? "radial-gradient(circle, #fffdf0 0%, #ffd700 70%, #d4af37 100%)"
                : isSoft
                ? "linear-gradient(135deg, #fff8dc 0%, #fed876 40%, #cca044 100%)"
                : "linear-gradient(135deg, #fff3c4 0%, #ffd700 35%, #dfb15b 70%, #b8860b 100%)",
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
