import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from 'motion/react'

function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { duration: 2, ease: 'easeOut' })
      return controls.stop
    }
  }, [inView, count, to])

  return (
    <span ref={ref} className="font-display text-5xl text-accent md:text-6xl">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const STATS = [
  { to: 4, suffix: '+', label: 'anos de experiência' },
  { to: 60, suffix: '+', label: 'projetos entregues' },
  { to: 100, suffix: '%', label: 'foco em performance' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="sobre" ref={ref} className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-4 font-mono text-sm text-accent"
        >
          {'// sobre'}
        </motion.p>

        <div className="grid gap-12 lg:grid-cols-2">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-4xl leading-tight uppercase md:text-5xl"
          >
            Código, integração e{' '}
            <span className="text-accent">visibilidade</span> no mesmo lugar
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="space-y-5 text-lg text-white/60"
          >
            <p>
              Sou John Aliore, especialista em tecnologia web. Construo sites e
              aplicações rápidas, conecto sistemas que não conversam entre si e
              faço o Google trabalhar a favor do seu negócio.
            </p>
            <p>
              Cada projeto une três frentes: engenharia sólida, integrações
              inteligentes e SEO técnico — porque um site bonito que ninguém
              encontra não gera resultado.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
          className="mt-20 grid overflow-hidden rounded-2xl border border-line bg-panel lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="relative min-h-72 lg:min-h-0">
            <img
              src="/fotos/john-grupoix-360.webp"
              alt="John Aliore trabalhando no Grupo IX"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-panel/90 max-lg:bg-gradient-to-t max-lg:to-panel" />
          </div>

          <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-4">
              <img
                src="/logos/Logo-gpix-r.png"
                alt="Grupo IX"
                className="h-12 w-12"
              />
              <div>
                <p className="font-mono text-xs tracking-widest text-[#f7a600] uppercase">
                  Onde trabalho hoje
                </p>
                <h3 className="font-display text-2xl uppercase">
                  Grupo IX{' '}
                  <span className="text-white/40">· Marketing 360</span>
                </h3>
              </div>
            </div>

            <p className="mt-6 text-white/60">
              No Grupo IX eu vivo o dia a dia de uma agência de marketing 360:
              sou responsável pelo site da empresa e pelo{' '}
              <strong className="text-white">MKTRICS</strong>, a plataforma
              interna que integra IAs, estratégias e monitoramento de SEO para
              os analistas.
            </p>
            <p className="mt-4 text-white/60">
              Além do código, faço a{' '}
              <strong className="text-white">
                gestão de uma equipe com mais 2 desenvolvedores
              </strong>{' '}
              — planejamento, revisão e entrega dos projetos do grupo.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {['Liderança técnica', 'MKTRICS', 'Gestão de devs', 'SEO'].map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line px-3 py-1 font-mono text-xs text-white/50"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>

            <a
              href="https://grupoix.com.br/"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-block rounded-full border border-[#f7a600]/60 px-6 py-2.5 font-mono text-xs text-[#f7a600] transition-colors hover:bg-[#f7a600] hover:text-ink"
            >
              conhecer o Grupo IX ↗
            </a>
          </div>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className="bg-panel p-10 text-center"
            >
              <Counter to={s.to} suffix={s.suffix} />
              <p className="mt-3 font-mono text-sm text-white/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
