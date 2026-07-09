import { useState } from 'react'
import { motion } from 'motion/react'
import { trackEvent } from '../lib/analytics'

const DECK = [
  {
    title: 'Flora Rome',
    url: 'https://florarome.com.br/',
    preview: '/previews/florarome.webp',
    cat: 'Institucional',
    desc: 'Fragrâncias e parcerias que marcam décadas — site institucional com catálogo de segmentos e representantes.',
  },
  {
    title: 'Marcenaria Del Rey',
    url: 'https://marcenariadelrey.com.br/',
    preview: '/previews/marcenariadelrey.webp',
    cat: 'Institucional',
    desc: 'Marcenaria com mais de 4 décadas de história — apresentação de oficina, planejamento, design e montagem.',
  },
  {
    title: 'Azura Digital',
    url: 'https://azuradigital.com.br/',
    preview: '/previews/azuradigital.webp',
    cat: 'Landing page',
    desc: 'Antecipação de recebíveis com agilidade e segurança — landing page com captação de leads integrada.',
  },
  {
    title: 'Multipharma',
    url: 'http://multipharma.com.br/',
    preview: '/previews/multipharma.webp',
    cat: 'E-commerce',
    desc: 'E-commerce de homeopatia e bem-estar: catálogo por categorias, kits e receitas.',
  },
  {
    title: 'Tavet',
    url: 'https://www.tavet.com.br/',
    preview: '/previews/tavet.webp',
    cat: 'E-commerce',
    desc: 'Farmácia veterinária online — medicamentos manipulados, pet shop e envio de receitas.',
  },
  {
    title: 'AG Power',
    url: 'https://agpower.com.br/',
    preview: '/previews/agpower.webp',
    cat: 'Institucional',
    desc: 'Empresa de energia solar 4x eleita a melhor de Campinas e região — site com captação de leads.',
  },
  {
    title: 'Grupo IX',
    url: 'https://grupoix.com.br/',
    preview: '/previews/grupoix.webp',
    cat: 'Onde trabalho',
    desc: 'Agência de Marketing 360 onde atuo hoje — gerencio o site, o MKTRICS e a equipe de desenvolvimento.',
  },
]

const VISIBLE = 4

export default function ProjectDeck() {
  const [cards, setCards] = useState(DECK)
  const [page, setPage] = useState(0)

  const next = () => {
    setCards(([first, ...rest]) => [...rest, first])
    setPage((p) => (p + 1) % DECK.length)
    trackEvent('deck_navigate', { direction: 'next' })
  }
  const prev = () => {
    setCards((arr) => [arr[arr.length - 1], ...arr.slice(0, -1)])
    setPage((p) => (p - 1 + DECK.length) % DECK.length)
  }

  const top = cards[0]

  return (
    <section id="arquivo" className="relative overflow-hidden py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="mb-4 font-mono text-sm text-accent">{'// arquivo'}</p>
          <h2 className="font-display text-4xl uppercase md:text-5xl">
            Mais projetos <span className="text-stroke">na pilha</span>
          </h2>
          <p className="mt-6 max-w-md text-white/60">
            Uma coleção de sites e sistemas que passaram pelas minhas mãos.
            Arraste o card ou use as setas para folhear — tem sempre mais um
            atrás.
          </p>

          <div className="mt-10 min-h-28">
            <motion.div
              key={top.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl uppercase">{top.title}</h3>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-xs text-accent">
                  {top.cat}
                </span>
              </div>
              <p className="mt-3 max-w-md text-sm text-white/60">{top.desc}</p>
            </motion.div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={prev}
              aria-label="Projeto anterior"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white/70 transition-colors hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Próximo projeto"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-white/70 transition-colors hover:border-accent hover:text-accent"
            >
              →
            </button>
            <span className="ml-2 font-mono text-sm text-white/40">
              {String(page + 1).padStart(2, '0')} /{' '}
              {String(DECK.length).padStart(2, '0')}
            </span>
            <a
              href={top.url}
              target="_blank"
              rel="noreferrer"
              onClick={() =>
                trackEvent('project_click', {
                  project: top.title,
                  section: 'deck',
                })
              }
              className="ml-auto rounded-full bg-accent px-6 py-2.5 font-mono text-xs font-medium text-ink transition-transform hover:scale-105"
            >
              visitar ↗
            </a>
          </div>
        </div>

        <div className="relative mx-auto h-[340px] w-full max-w-[560px] select-none sm:h-[400px]">
          {cards.slice(0, VISIBLE).map((card, i) => {
            const isTop = i === 0
            return (
              <motion.div
                key={card.title}
                animate={{
                  x: i * 22,
                  y: i * -14,
                  scale: 1 - i * 0.045,
                  rotate: i * 1.6,
                  opacity: 1 - i * 0.18,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                style={{ zIndex: VISIBLE - i, transformOrigin: 'bottom right' }}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (Math.abs(info.offset.x) > 90) next()
                }}
                className={`absolute inset-0 overflow-hidden rounded-2xl border bg-panel shadow-2xl shadow-black/60 ${
                  isTop
                    ? 'cursor-grab border-accent/50 active:cursor-grabbing'
                    : 'pointer-events-none border-line'
                }`}
              >
                <img
                  src={card.preview}
                  alt={`Prévia de ${card.title}`}
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/95 via-ink/60 to-transparent px-5 pt-14 pb-4">
                  <span className="font-display text-lg uppercase">
                    {card.title}
                  </span>
                  <span className="font-mono text-xs text-accent">{card.cat}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
