import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { trackEvent } from '../lib/analytics'

const CASES = [
  {
    title: 'MKTRICS',
    client: 'Grupo IX',
    url: 'https://mktrics.grupoix.com.br/login',
    embed: true,
    cat: 'Plataforma interna',
    desc: 'Ferramenta de gestão e integração para o dia a dia dos analistas: integrações com IAs, criação de estratégias, monitoramento de palavras-chave, blogs e muito mais.',
    tags: ['Integrações com IA', 'SEO', 'Automação'],
  },
  {
    title: 'Elencomania',
    client: 'Sistema de gestão',
    url: 'https://system.elencomania.com.br/src/auth/login.php',
    embed: true,
    cat: 'Sistema web',
    desc: 'Sistema de gestão de modelos e agências de fotografia — cadastros, elencos e operação da agência em um só lugar.',
    tags: ['PHP', 'Gestão', 'Painel admin'],
  },
  {
    title: 'Nexio Trim',
    client: 'E-commerce',
    url: 'https://nexiotrim.com.br/',
    embed: false,
    preview: '/previews/nexiotrim.webp',
    cat: 'E-commerce',
    desc: 'E-commerce construído do zero com Laravel + React: catálogo, carrinho, checkout e painel de gestão próprios.',
    tags: ['Laravel', 'React', 'Pagamentos'],
  },
  {
    title: 'Rox Demolition',
    client: 'Institucional · EUA',
    url: 'https://roxdemolition.com/',
    embed: false,
    preview: '/previews/roxdemolition.webp',
    cat: 'Site institucional',
    desc: 'Site institucional para empresa de demolição nos Estados Unidos — foco em captação local e presença no Google.',
    tags: ['Institucional', 'SEO local', 'Performance'],
  },
]

function Preview({ item }) {
  if (item.embed) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <iframe
          src={item.url}
          title={`Prévia de ${item.title}`}
          loading="lazy"
          tabIndex={-1}
          aria-hidden="true"
          scrolling="no"
          className="absolute top-0 left-0 h-[400%] w-[400%] origin-top-left scale-[0.25] border-0 bg-white"
        />
      </div>
    )
  }
  return (
    <img
      src={item.preview}
      alt={`Prévia de ${item.title}`}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
    />
  )
}

function CaseCard({ item, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noreferrer"
      onClick={() =>
        trackEvent('project_click', { project: item.title, section: 'cases' })
      }
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 2) * 0.15, ease: 'easeOut' }}
      className="group block overflow-hidden rounded-2xl border border-line bg-panel transition-colors hover:border-accent/60"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        <Preview item={item} />
        <div className="absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-60" />
        <span className="absolute top-4 left-4 rounded-full border border-line bg-ink/80 px-3 py-1 font-mono text-xs text-accent backdrop-blur-sm">
          {item.cat}
        </span>
        <span className="absolute right-4 bottom-4 translate-y-2 rounded-full bg-accent px-4 py-1.5 font-mono text-xs font-medium text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          visitar site ↗
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl uppercase transition-colors group-hover:text-accent">
            {item.title}
          </h3>
          <span className="font-mono text-xs whitespace-nowrap text-white/40">
            {item.client}
          </span>
        </div>
        <p className="mt-3 text-sm text-white/60">{item.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-3 py-1 font-mono text-xs text-white/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  )
}

export default function LiveProjects() {
  return (
    <section id="cases" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 font-mono text-sm text-accent">{'// em produção'}</p>
        <h2 className="mb-4 font-display text-4xl uppercase md:text-5xl">
          Projetos <span className="text-accent">no ar</span>
        </h2>
        <p className="mb-16 max-w-xl text-white/60">
          Sistemas e sites reais, em produção agora — a prévia abaixo é o
          próprio site sendo carregado ao vivo.
        </p>
        <div className="grid gap-8 md:grid-cols-2">
          {CASES.map((c, i) => (
            <CaseCard key={c.title} item={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
