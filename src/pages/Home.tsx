import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";

import IntroGate from "../sections/IntroGate";
import Hero from "../sections/Hero";
import InviteMessage from "../sections/InviteMessage";
import CountdownSection from "../sections/CountdownSection";
import Events from "../sections/Events";
import Venue from "../sections/Venue";
import Footer from "../sections/Footer";
import ScrollProgress from "../components/ScrollProgress";
import FloatingPetals from "../components/FloatingPetals";
import MusicPlayer from "../components/MusicPlayer";
import { wedding } from "../config";

type Stage = "closed" | "opening" | "open";

export default function Home() {
  const [stage, setStage] = useState<Stage>("closed");

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let id = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      id = requestAnimationFrame(loop);
    };
    id = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = stage === "open" ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [stage]);

  return (
    <main className="relative min-h-[100dvh] bg-[#f3ede3] text-[#1a1814]">
      <ScrollProgress />
      <MusicPlayer autoPlayTrigger={stage !== "closed"} />
      {stage === "open" && <FloatingPetals count={24} />}
      <motion.div
        initial={{ scale: 1.04, opacity: 0.92 }}
        animate={{
          scale: stage === "closed" ? 1.04 : 1,
          opacity: 1,
        }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <InviteMessage />
        {wedding.sections?.countdown !== false && <CountdownSection />}
        {wedding.sections?.events !== false && <Events />}
        {wedding.sections?.venue !== false && <Venue />}
        <Footer />
      </motion.div>

      <AnimatePresence>
        {stage !== "open" && (
          <IntroGate
            onOpening={() => setStage("opening")}
            onOpened={() => setStage("open")}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
