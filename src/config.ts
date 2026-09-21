// ─────────────────────────────────────────────────────────────
//  WEDDING CONFIG — Sana Fatima & Yousuf Qureshi
// ─────────────────────────────────────────────────────────────

export const wedding = {
  groom: "Yousuf",
  bride: "Sana",
  groomFull: "Yousuf Qureshi",
  brideFull: "Sana Fatima",
  groomParents: "Son of the Qureshi Family",
  brideParents: "Daughter of the Fatima Family",
  hashtag: "#YousufWedsSana",
  monogram: "Y · S",

  // Walima Event (countdown + calendar)
  dateISO: "2026-11-01T19:00:00+05:30",
  dateLabel: "Sunday, 1st November 2026",
  timeLabel: "Walima Reception at 7:00 PM",

  venue: {
    name: "Sapphire Suites",
    address: "Metro City Centre, Nishatganj Bridge, Lucknow, Uttar Pradesh 226006",
    mapsQuery: "Sapphire Suites, Metro City Centre, Nishatganj, Lucknow, Uttar Pradesh 226006",
    mapsUrl: "https://maps.app.goo.gl/wqCm6WziXPEGNfPCA?g_st=ic",
  },

  verse: {
    arabic: "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ",
    text: "With joyful hearts and grateful families, we warmly invite you to celebrate the Walima ceremony of Yousuf & Sana — a blessed union begun with faith and cherished with love.",
  },

  events: [
    {
      name: "The Walima",
      icon: "heart",
      date: "Sunday, 1st November 2026",
      dayLabel: "Sunday",
      dayNum: "01",
      monthLabel: "November 2026",
      time: "Walima at 7:00 PM",
      venue: "Sapphire Suites, Metro City Centre, Lucknow",
      note: "An auspicious evening of joyous celebration, dinner, and blessings as two souls and families unite.",
    },
  ],

  program: [
    { name: "Guest Welcome & Reception", time: "7:00 PM" },
    { name: "Grand Entry of Bride & Groom", time: "7:45 PM" },
    { name: "Dua & Blessings", time: "8:15 PM" },
    { name: "Walima Dinner Feast", time: "8:45 PM" },
    { name: "Photographs & Celebration", time: "9:30 PM" },
  ],

  sections: {
    events: true,
    venue: true,
    countdown: true,
  },
};

export const googleCalendarUrl = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]|\.\d{3}/g, "").slice(0, 15) + "Z";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Walima: ${wedding.groom} weds ${wedding.bride}`,
    dates: `${fmt(start)}/${fmt(end)}`,
    details: `${wedding.venue.name} — ${wedding.venue.address}. ${wedding.hashtag}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const downloadICS = () => {
  const start = new Date(wedding.dateISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:.]/g, "").slice(0, 15) + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//InviteStory//Wedding//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@invitestory`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Walima: ${wedding.groom} weds ${wedding.bride}`,
    `DESCRIPTION:${wedding.venue.name} — ${wedding.venue.address}`,
    `LOCATION:${wedding.venue.name}\\, ${wedding.venue.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${wedding.groom}-${wedding.bride}-walima.ics`;
  a.click();
  URL.revokeObjectURL(url);
};

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.venue.mapsQuery
)}&output=embed`;

export const mapsDirectionsUrl =
  wedding.venue.mapsUrl ||
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    wedding.venue.mapsQuery
  )}`;
