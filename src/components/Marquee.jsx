import { motion } from 'motion/react'

const ITEMS = [
  'React',
  'Next.js',
  'Node.js',
  'APIs & Integrações',
  'SEO Técnico',
  'WordPress',
  'Performance',
  'E-commerce',
  'Automação',
  'Analytics',
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative overflow-hidden border-y border-line bg-panel py-5">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
      >
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-12 font-mono text-sm uppercase tracking-widest text-white/50"
          >
            {item}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
