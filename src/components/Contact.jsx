import { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { trackEvent } from '../lib/analytics'

const WHATSAPP_URL =
  'https://wa.me/5519995793431?text=' +
  encodeURIComponent('Olá gostaria de cotar um projeto com John Aliore.')

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contato" ref={ref} className="grid-bg relative py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(163,255,18,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          className="mb-6 font-mono text-sm text-accent"
        >
          {'// contato'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] uppercase"
        >
          Vamos construir
          <br />
          <span className="text-stroke">algo</span>{' '}
          <span className="text-accent">grande?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="mailto:ja@johnaliore.com.br"
            onClick={() => trackEvent('contact_click', { method: 'email' })}
            className="rounded-full bg-accent px-10 py-4 font-mono text-sm font-medium text-ink transition-transform hover:scale-105"
          >
            ja@johnaliore.com.br
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackEvent('whatsapp_click', { location: 'contact_section' })
            }
            className="rounded-full border border-line px-10 py-4 font-mono text-sm text-white/80 transition-colors hover:border-accent hover:text-accent"
          >
            WhatsApp
          </a>
        </motion.div>
      </div>

      <footer className="relative mt-28 border-t border-line pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} John Aliore — Web · Integrações · SEO
          </p>
          <div className="flex gap-6 font-mono text-xs text-white/40">
            <a href="#" className="transition-colors hover:text-accent">
              LinkedIn
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              GitHub
            </a>
            <a href="#" className="transition-colors hover:text-accent">
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </section>
  )
}
