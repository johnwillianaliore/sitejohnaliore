import { useRef } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react'

const SERVICES = [
  {
    num: '01',
    title: 'Desenvolvimento Web',
    desc: 'Sites, landing pages e aplicações em React e Next.js. Rápidos, responsivos e pensados para converter.',
    tags: ['React', 'Next.js', 'Node.js', 'WordPress'],
  },
  {
    num: '02',
    title: 'Integrações',
    desc: 'Conecto suas ferramentas: CRM, ERP, e-commerce, pagamentos e automações. Seus sistemas conversando sem retrabalho.',
    tags: ['APIs REST', 'Webhooks', 'Automação', 'E-commerce'],
  },
  {
    num: '03',
    title: 'Soluções de SEO',
    desc: 'SEO técnico e de conteúdo: performance, indexação, dados estruturados e estratégia para ranquear onde importa.',
    tags: ['SEO Técnico', 'Core Web Vitals', 'Schema', 'Analytics'],
  },
]

function TiltCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative rounded-2xl border border-line bg-panel p-8 transition-colors hover:border-accent/60"
    >
      <span className="font-display text-5xl text-white/10 transition-colors group-hover:text-accent/30">
        {service.num}
      </span>
      <h3 className="mt-6 font-display text-2xl uppercase">{service.title}</h3>
      <p className="mt-4 text-white/60">{service.desc}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {service.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-white/50 transition-colors group-hover:border-accent/40 group-hover:text-accent"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,rgba(163,255,18,0.06),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  )
}

export default function Services() {
  return (
    <section id="servicos" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 font-mono text-sm text-accent">{'// serviços'}</p>
        <h2 className="mb-16 font-display text-4xl uppercase md:text-5xl">
          O que eu <span className="text-stroke">entrego</span>
        </h2>
        <div className="grid gap-6 md:grid-cols-3" style={{ perspective: 1200 }}>
          {SERVICES.map((s, i) => (
            <TiltCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
