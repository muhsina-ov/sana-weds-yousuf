import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  autoPlayTrigger?: boolean;
}

export default function MusicPlayer({ autoPlayTrigger }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showNotice, setShowNotice] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio.mp3");
    audio.loop = true;
    audio.volume = 0.75;
    audioRef.current = audio;

    audio.addEventListener("play", () => setIsPlaying(true));
    audio.addEventListener("pause", () => setIsPlaying(false));
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  // When autoPlayTrigger turns true (user clicked "Open Invitation")
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !hasInteracted) {
      setHasInteracted(true);
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setShowNotice(true);
            setTimeout(() => setShowNotice(false), 4500);
          })
          .catch((err) => {
            console.warn("Autoplay blocked or waiting for user interaction:", err);
            setIsPlaying(false);
          });
      }
    }
  }, [autoPlayTrigger, hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    setHasInteracted(true);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Track banner toast */}
      <AnimatePresence>
        {showNotice && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 15, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none hidden items-center gap-2 rounded-full border border-[#d4af37]/35 bg-[#fffdfa]/95 px-4 py-2 shadow-[0_8px_24px_rgba(40,30,20,0.12)] backdrop-blur-md sm:flex"
          >
            <Music size={13} className="text-[#c59b27] animate-pulse" />
            <span className="font-display text-xs tracking-wider text-[#4a3f35]">
              Maula Ya Salli Wasallim (Rabab)
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating play/pause pill */}
      <motion.button
        type="button"
        onClick={togglePlay}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#fffdfa]/90 text-[#3d332a] shadow-[0_8px_25px_rgba(60,45,30,0.15)] backdrop-blur-md transition-colors hover:border-[#d4af37] hover:bg-[#fffdfa]"
        aria-label={isPlaying ? "Mute music" : "Play music"}
        title={isPlaying ? "Mute background music" : "Play background music"}
      >
        {/* Subtle rotating gold ring when playing */}
        {isPlaying && (
          <span
            className="pointer-events-none absolute inset-[-3px] rounded-full border border-dashed border-[#d4af37]/60"
            style={{ animation: "spin 12s linear infinite" }}
          />
        )}

        {/* Dynamic visualizer bars or muted icon */}
        {isPlaying ? (
          <div className="flex items-end gap-[2.5px] h-4">
            <span
              className="w-[2.5px] rounded-full bg-[#c59b27]"
              style={{
                height: "60%",
                animation: "pulse 0.9s ease-in-out infinite alternate",
              }}
            />
            <span
              className="w-[2.5px] rounded-full bg-[#996515]"
              style={{
                height: "100%",
                animation: "pulse 0.7s ease-in-out 0.2s infinite alternate",
              }}
            />
            <span
              className="w-[2.5px] rounded-full bg-[#c59b27]"
              style={{
                height: "75%",
                animation: "pulse 0.85s ease-in-out 0.4s infinite alternate",
              }}
            />
            <span
              className="w-[2.5px] rounded-full bg-[#d4af37]"
              style={{
                height: "45%",
                animation: "pulse 0.6s ease-in-out 0.1s infinite alternate",
              }}
            />
          </div>
        ) : (
          <VolumeX size={17} className="text-[#8a7a68] transition-colors group-hover:text-[#1a1814]" />
        )}
      </motion.button>
    </div>
  );
}
