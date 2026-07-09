import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { isWebGLAvailable } from '../lib/webgl'
import { trackEvent } from '../lib/analytics'
import RocketFallback from './RocketFallback'

const HeroCore = lazy(() => import('./HeroCore'))

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}

const line = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  const { scrollY } = useScroll()
  const yText = useTransform(scrollY, [0, 600], [0, -120])
  const opacity = useTransform(scrollY, [0, 500], [1, 0])
  const [webgl, setWebgl] = useState(false)

  useEffect(() => {
    setWebgl(isWebGLAvailable())
  }, [])

  return (
    <section
      id="top"
      className="grid-bg relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(163,255,18,0.08),transparent_55%)]" />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 pt-24 lg:grid-cols-2">
        <motion.div style={{ y: yText, opacity }} className="z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 font-mono text-sm text-accent"
          >
            {'// desenvolvedor & consultor digital'}
          </motion.p>

          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-display text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[0.95] uppercase"
          >
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block">
                Tecnologia
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="text-stroke block">
                Web &amp;
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span variants={line} className="block text-accent">
                Resultados
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 max-w-md text-lg text-white/60"
          >
            Sites de alta performance, integrações entre sistemas e SEO que
            coloca o seu negócio na frente. Do código ao ranking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projetos"
              onClick={() => trackEvent('cta_click', { cta: 'hero_projects' })}
              className="rounded-full bg-accent px-8 py-3 font-mono text-sm font-medium text-ink transition-transform hover:scale-105"
            >
              Ver projetos →
            </a>
            <a
              href="#servicos"
              className="rounded-full border border-line px-8 py-3 font-mono text-sm text-white/80 transition-colors hover:border-accent hover:text-accent"
            >
              Serviços
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="relative h-[420px] cursor-grab active:cursor-grabbing lg:h-[640px]"
        >
          {webgl ? (
            <Suspense fallback={<RocketFallback />}>
              <HeroCore />
            </Suspense>
          ) : (
            <RocketFallback />
          )}
          {webgl && (
            <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-xs text-white/30">
              arraste para girar
            </p>
          )}
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
          className="font-mono text-xs text-white/40"
        >
          ↓ scroll
        </motion.div>
      </motion.div>
    </section>
  )
}
