import { useEffect, useRef, useState } from "react";

export type ParallaxPoint = {
  x: number;
  y: number;
  /** 0..1 how far through the hero viewport we've scrolled */
  scroll: number;
  /** Pointer velocity magnitude for spark/shimmer intensity */
  velocity: number;
};

const idle: ParallaxPoint = { x: 0, y: 0, scroll: 0, velocity: 0 };

/**
 * Smooth pointer + scroll parallax driver.
 * Returns normalized offsets in roughly -1..1 space, plus scroll (0..1).
 */
export function useParallax(enabled = true) {
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const prev = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);
  const [point, setPoint] = useState<ParallaxPoint>(idle);

  useEffect(() => {
    if (!enabled) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    // Gentle tilt from device orientation (mobile), clamped
    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      const ox = Math.max(-1, Math.min(1, e.gamma / 28));
      const oy = Math.max(-1, Math.min(1, (e.beta - 45) / 35));
      // Only use if there's little mouse activity (mobile)
      if (Math.abs(target.current.x) < 0.05 && Math.abs(target.current.y) < 0.05) {
        target.current.x = ox * 0.55;
        target.current.y = oy * 0.45;
      }
    };

    let raf = 0;
    const tick = () => {
      const ease = 0.08;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      const dx = current.current.x - prev.current.x;
      const dy = current.current.y - prev.current.y;
      const velocity = Math.min(1, Math.hypot(dx, dy) * 18);
      prev.current.x = current.current.x;
      prev.current.y = current.current.y;

      const scrollNorm = Math.min(1.4, scrollY.current / Math.max(1, window.innerHeight));

      setPoint({
        x: current.current.x,
        y: current.current.y * 0.88 + Math.min(1, scrollNorm) * 0.42,
        scroll: scrollNorm,
        velocity,
      });
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("deviceorientation", onOrient, { passive: true });
    onScroll();
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("deviceorientation", onOrient);
    };
  }, [enabled]);

  return point;
}

export function layerTransform(
  point: ParallaxPoint,
  depth: number,
  opts?: { rotate?: number; scale?: number; scrollY?: number; invert?: boolean }
) {
  const dir = opts?.invert ? -1 : 1;
  const x = point.x * depth * 34 * dir;
  const y =
    point.y * depth * 22 * dir + (opts?.scrollY ?? 0) * point.scroll * 80;
  const r = (opts?.rotate ?? 0) * point.x * dir;
  const s = (opts?.scale ?? 1) * (1 + point.scroll * depth * 0.04);
  return {
    transform: `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${r.toFixed(3)}deg) scale(${s.toFixed(4)})`,
  };
}

/** 3D card tilt from local pointer position within an element */
export function useLocalTilt(strength = 8) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
    };

    const tick = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      setStyle({
        transform: `perspective(900px) rotateX(${(-cy * strength).toFixed(2)}deg) rotateY(${(cx * strength).toFixed(2)}deg)`,
      });
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return { ref, style };
}
