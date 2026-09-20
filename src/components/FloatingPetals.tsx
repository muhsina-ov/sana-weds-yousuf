import { useMemo } from "react";
import { motion } from "framer-motion";

type GoldenPetal = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  opacity: number;
  rotate: number;
  type: "petal" | "shimmer";
};

/** Soft falling golden petals & gold leaf flecks for luxury celebration atmosphere */
export default function FloatingPetals({ count = 22 }: { count?: number }) {
  const petals = useMemo<GoldenPetal[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: (i * 19 + 5) % 100,
        delay: (i % 8) * 0.75,
        duration: 9 + (i % 6) * 1.6,
        size: (i % 3 === 0 ? 9 : 6) + (i % 4) * 2,
        drift: 20 + (i % 5) * 12,
        opacity: 0.45 + (i % 4) * 0.15,
        rotate: (i % 2 === 0 ? 1 : -1) * (35 + (i % 6) * 20),
        type: i % 4 === 0 ? "shimmer" : "petal",
      })),
    [count]
  );

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[8] overflow-hidden"
      aria-hidden
    >
      {petals.map((p) => (
        <span
          key={p.id}
          className={`absolute top-[-10%] ${
            p.type === "petal"
              ? "rounded-[45%_55%_65%_35%] shadow-[0_3px_8px_rgba(212,175,55,0.35)]"
              : "rounded-full shadow-[0_0_10px_rgba(255,223,128,0.7)]"
          }`}
          style={{
            left: `${p.left}%`,
            width: p.type === "shimmer" ? p.size * 0.55 : p.size,
            height: p.type === "shimmer" ? p.size * 0.55 : p.size * 1.4,
            opacity: p.opacity,
            background:
              p.type === "shimmer"
                ? "radial-gradient(circle, #fff7d6 0%, #ffd700 70%, #d4af37 100%)"
                : "linear-gradient(135deg, #fff3c4 0%, #ffd700 30%, #dfb15b 60%, #b8860b 100%)",
            animation: `petal-fall ${p.duration}s linear ${p.delay}s infinite`,
            ["--drift" as string]: `${p.drift}px`,
            ["--spin" as string]: `${p.rotate}deg`,
          }}
        />
      ))}
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
