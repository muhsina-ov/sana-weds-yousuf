import { CalendarPlus, Navigation, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "../components/Reveal";
import { useLocalTilt } from "../hooks/useParallax";
import {
  wedding,
  googleCalendarUrl,
  downloadICS,
  mapsEmbedUrl,
  mapsDirectionsUrl,
} from "../config";

export default function Venue() {
  const mapTilt = useLocalTilt(5);

  return (
    <section className="relative px-6 py-24">
      <Reveal className="mb-12 flex flex-col items-center gap-3 text-center">
        <span className="text-[11px] uppercase tracking-[0.4em] text-[#8a7a68]">
          Where & when
        </span>
        <h2 className="font-script text-5xl text-[#1a1814] sm:text-6xl">The Venue</h2>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#1a1814]/25 to-transparent" />
      </Reveal>

      <div className="mx-auto flex max-w-md flex-col gap-6">
        <Reveal className="flex flex-col items-center gap-2 text-center">
          <h3 className="font-display text-3xl text-[#1a1814]">{wedding.venue.name}</h3>
          <p className="flex items-center gap-2 text-[13px] text-[#5c5146]">
            <MapPin size={14} className="text-[#8a7a68]" />
            {wedding.venue.address}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div
            ref={mapTilt.ref}
            style={mapTilt.style}
            className="overflow-hidden rounded-[1.75rem] shadow-[0_24px_60px_rgba(60,45,30,0.1)] ring-1 ring-[rgba(26,24,20,0.1)]"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <iframe
              title="Wedding venue map"
              src={mapsEmbedUrl}
              className="h-64 w-full saturate-[0.85] contrast-[1.02] sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </Reveal>

        <Reveal delay={0.12} className="grid grid-cols-1 gap-3">
          <motion.a
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#1a1814] px-8 py-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#f6f0e6] shadow-[0_14px_36px_rgba(40,30,20,0.22)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              style={{ animation: "sweep 3.6s ease-in-out infinite" }}
            />
            <Navigation size={15} />
            Get directions
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-px">
              ↗
            </span>
          </motion.a>

          <div className="grid grid-cols-2 gap-3">
            <motion.a
              href={googleCalendarUrl()}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-full border border-[#1a1814]/12 bg-white/40 px-4 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#2c261f] transition-colors duration-500 hover:border-[#1a1814]/25 hover:bg-white/70"
            >
              <CalendarPlus size={14} /> Google
            </motion.a>
            <motion.button
              type="button"
              onClick={downloadICS}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-2 rounded-full border border-[#1a1814]/12 bg-white/40 px-4 py-3.5 text-[10px] uppercase tracking-[0.2em] text-[#2c261f] transition-colors duration-500 hover:border-[#1a1814]/25 hover:bg-white/70"
            >
              <CalendarPlus size={14} /> Apple / ICS
            </motion.button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
