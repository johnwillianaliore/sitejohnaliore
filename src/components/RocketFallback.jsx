import { motion } from 'motion/react'

// Foguete SVG animado — usado quando o navegador não tem WebGL disponível.
export default function RocketFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* halo */}
      <div className="absolute h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

      {/* anel orbital */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        className="absolute h-[380px] w-[380px] rounded-full border border-accent/15 md:h-[500px] md:w-[500px]"
      >
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 38, ease: 'linear' }}
        className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-accent/10 md:h-[400px] md:w-[400px]"
      />

      <motion.svg
        animate={{ y: [0, -16, 0], rotate: [-2, 2, -2] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        viewBox="0 0 200 320"
        className="relative h-72 w-auto md:h-96"
        fill="none"
      >
        {/* chama */}
        <motion.g
          animate={{ scaleY: [1, 1.35, 1], opacity: [0.9, 0.6, 0.9] }}
          transition={{ repeat: Infinity, duration: 0.35 }}
          style={{ transformOrigin: '100px 250px' }}
        >
          <path d="M85 250 Q100 310 115 250 Q100 275 85 250Z" fill="#a3ff12" opacity="0.85" />
          <path d="M92 250 Q100 290 108 250 Q100 268 92 250Z" fill="#e8ffb0" />
        </motion.g>

        {/* aletas */}
        <path d="M62 200 L30 250 L62 240 Z" fill="#a3ff12" />
        <path d="M138 200 L170 250 L138 240 Z" fill="#a3ff12" />

        {/* corpo */}
        <path
          d="M100 20 C130 60 138 110 138 160 L138 235 L62 235 L62 160 C62 110 70 60 100 20 Z"
          fill="#1c1c22"
          stroke="#a3ff12"
          strokeWidth="2"
        />
        {/* nariz */}
        <path d="M100 20 C114 38 122 60 126 82 L74 82 C78 60 86 38 100 20 Z" fill="#a3ff12" />

        {/* linhas "digitais" */}
        <path d="M62 190 L138 190 M62 215 L138 215" stroke="#a3ff12" strokeWidth="1" opacity="0.35" />

        {/* janela */}
        <circle cx="100" cy="120" r="20" fill="#0a0a0c" stroke="#a3ff12" strokeWidth="3" />
        <circle cx="100" cy="120" r="10" fill="#a3ff12" opacity="0.25" />

        {/* bocal */}
        <path d="M78 235 L122 235 L114 252 L86 252 Z" fill="#0d0d10" stroke="#a3ff12" strokeWidth="1.5" />
      </motion.svg>

      {/* partículas subindo */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-accent/70"
          style={{ left: `${28 + i * 9}%`, bottom: '12%' }}
          animate={{ y: [0, -140], opacity: [0, 1, 0] }}
          transition={{
            repeat: Infinity,
            duration: 2.4 + (i % 3) * 0.7,
            delay: i * 0.4,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
