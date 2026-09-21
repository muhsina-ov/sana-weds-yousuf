interface FloralMotifProps {
  className?: string;
  size?: number;
  opacity?: number;
}

/**
 * Luxury Ornamental Rose & Gold Floral Branch SVG Motif
 * Combines deep velvet ruby roses with intricate gold leaves and tendrils
 */
export default function FloralMotif({
  className = "",
  size = 120,
  opacity = 0.9,
}: FloralMotifProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
    >
      <defs>
        {/* Luxury Gold Linear & Radial Gradients */}
        <linearGradient id="gold-leaf-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2c2" />
          <stop offset="35%" stopColor="#dfb256" />
          <stop offset="70%" stopColor="#c59b27" />
          <stop offset="100%" stopColor="#8c6818" />
        </linearGradient>

        <linearGradient id="gold-branch-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dfb256" />
          <stop offset="50%" stopColor="#b38728" />
          <stop offset="100%" stopColor="#7a5510" />
        </linearGradient>

        {/* Deep Royal Velvet Red Rose Gradients */}
        <radialGradient
          id="rose-petal-dark"
          cx="45%"
          cy="40%"
          r="60%"
          fx="35%"
          fy="30%"
        >
          <stop offset="0%" stopColor="#b51226" />
          <stop offset="45%" stopColor="#800615" />
          <stop offset="85%" stopColor="#50000a" />
          <stop offset="100%" stopColor="#300005" />
        </radialGradient>

        <radialGradient
          id="rose-petal-vibrant"
          cx="40%"
          cy="35%"
          r="55%"
          fx="30%"
          fy="25%"
        >
          <stop offset="0%" stopColor="#e82b3d" />
          <stop offset="40%" stopColor="#ba0c1e" />
          <stop offset="75%" stopColor="#7a0310" />
          <stop offset="100%" stopColor="#4a0007" />
        </radialGradient>

        <radialGradient
          id="rose-petal-highlight"
          cx="35%"
          cy="35%"
          r="50%"
        >
          <stop offset="0%" stopColor="#ff5768" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#d11a2a" />
          <stop offset="100%" stopColor="#8b000f" />
        </radialGradient>

        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#3a050c" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Gold Foliage Stems & Leaves */}
      <g stroke="url(#gold-branch-grad)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 25,135 Q 55,100 80,82 Q 110,65 138,32" />
        <path d="M 52,103 Q 40,88 32,78" />
        <path d="M 75,85 Q 92,98 108,105" />
        <path d="M 104,70 Q 124,75 135,70" />
      </g>

      {/* Golden Leaves */}
      <g fill="url(#gold-leaf-grad)" opacity="0.95">
        {/* Leaf 1 */}
        <path d="M 32,78 C 30,70 38,62 48,65 C 48,75 40,83 32,78 Z" />
        {/* Leaf 2 */}
        <path d="M 108,105 C 118,108 126,102 125,92 C 115,92 108,98 108,105 Z" />
        {/* Leaf 3 */}
        <path d="M 135,70 C 145,68 148,58 142,50 C 134,55 130,64 135,70 Z" />
        {/* Small gold bud */}
        <circle cx="138" cy="32" r="3.5" fill="url(#gold-leaf-grad)" />
      </g>

      {/* Small Secondary Red Rose Accent */}
      <g transform="translate(38, 92) scale(0.65)" filter="url(#soft-shadow)">
        <path
          d="M 20,20 C 10,12 5,28 15,35 C 25,40 38,32 32,20 C 28,12 24,15 20,20 Z"
          fill="url(#rose-petal-dark)"
        />
        <path
          d="M 15,22 C 12,16 22,12 28,18 C 32,22 28,30 20,28 C 14,26 13,24 15,22 Z"
          fill="url(#rose-petal-vibrant)"
        />
        <circle cx="21" cy="22" r="4.5" fill="url(#rose-petal-highlight)" />
      </g>

      {/* Main Luxury Red Blooming Rose (Center-Stage) */}
      <g transform="translate(62, 52) scale(1)" filter="url(#soft-shadow)">
        {/* Outer deep velvet petals */}
        <path
          d="M 28,2 C 10,2 -2,22 4,38 C 10,54 36,62 50,56 C 66,50 72,28 62,12 C 54,0 38,2 28,2 Z"
          fill="url(#rose-petal-dark)"
        />
        {/* Mid petals */}
        <path
          d="M 18,12 C 8,24 12,42 26,48 C 42,54 56,44 54,28 C 52,14 36,8 24,10 Z"
          fill="url(#rose-petal-vibrant)"
        />
        <path
          d="M 44,14 C 54,24 48,38 36,42 C 22,46 16,36 22,24 C 28,14 38,10 44,14 Z"
          fill="url(#rose-petal-dark)"
          opacity="0.85"
        />
        {/* Inner petals wrap */}
        <path
          d="M 24,20 C 18,28 24,36 34,36 C 42,36 46,28 40,22 C 34,16 28,16 24,20 Z"
          fill="url(#rose-petal-highlight)"
        />
        <path
          d="M 31,24 C 27,27 28,32 33,32 C 37,32 39,28 36,25 C 34,22 32,22 31,24 Z"
          fill="#ffd27d"
          opacity="0.4"
        />
        <circle cx="33" cy="27" r="3.2" fill="#500008" />
        {/* Little golden dew/pollen speck in rose heart */}
        <circle cx="34" cy="26" r="1.2" fill="#fff5d1" />
      </g>
    </svg>
  );
}
