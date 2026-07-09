import { useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'

const PROJECTS = [
  {
    title: 'E-commerce Integrado',
    cat: 'Web + Integrações',
    year: '2025',
    desc: 'Loja virtual com ERP, gateway de pagamento e logística conectados em tempo real.',
  },
  {
    title: 'Portal Corporativo',
    cat: 'Web + SEO',
    year: '2025',
    desc: 'Site institucional com blog otimizado — top 3 no Google para as palavras-chave do setor.',
  },
  {
    title: 'Automação de Leads',
    cat: 'Integrações',
    year: '2024',
    desc: 'Captação, qualificação e distribuição de leads entre site, CRM e WhatsApp.',
  },
  {
    title: 'Migração & SEO Técnico',
    cat: 'SEO',
    year: '2024',
    desc: 'Migração de plataforma sem perda de tráfego, com ganho de 40% em Core Web Vitals.',
  },
]

function ProjectRow({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hover, setHover] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group cursor-pointer border-b border-line py-8 transition-colors hover:bg-panel/60"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-baseline gap-6">
          <span className="font-mono text-sm text-white/30">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="font-display text-2xl uppercase transition-colors group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
            <motion.p
              initial={false}
              animate={{ height: hover ? 'auto' : 0, opacity: hover ? 1 : 0 }}
              className="max-w-xl overflow-hidden text-white/60"
            >
              {project.desc}
            </motion.p>
          </div>
        </div>
        <div className="flex items-center gap-6 pl-12 md:pl-0">
          <span className="rounded-full border border-line px-4 py-1 font-mono text-xs text-white/50">
            {project.cat}
          </span>
          <span className="font-mono text-sm text-white/30">{project.year}</span>
          <motion.span
            animate={{ x: hover ? 6 : 0 }}
            className="hidden text-accent md:block"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projetos" className="relative py-28">
      <div className="mx-auto mb-16 max-w-7xl px-6">
        <p className="mb-4 font-mono text-sm text-accent">{'// projetos'}</p>
        <h2 className="font-display text-4xl uppercase md:text-5xl">
          Trabalhos <span className="text-accent">selecionados</span>
        </h2>
      </div>
      <div className="border-t border-line">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
