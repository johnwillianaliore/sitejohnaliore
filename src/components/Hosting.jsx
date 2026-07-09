import { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const PROVIDERS = [
  { name: 'Contabo', src: '/logos/contabo.svg' },
  { name: 'Hostinger', src: '/logos/hostinger.svg' },
  { name: 'HostGator', src: '/logos/hostgator.png' },
  { name: 'Locaweb', src: '/logos/locaweb.png' },
  { name: 'KingHost', src: '/logos/kinghost.svg' },
]

const ITEMS = [
  {
    title: 'Publicação & Deploy',
    desc: 'Do repositório ao ar: configuração de servidores, CI/CD, domínios, DNS e certificados SSL.',
  },
  {
    title: 'Gerenciamento de VPS',
    desc: 'Provisionamento, hardening, atualizações, firewall e monitoramento de servidores Linux.',
  },
  {
    title: 'Backups & Uptime',
    desc: 'Rotinas de backup automatizadas, restauração testada e alertas para manter tudo no ar.',
  },
]

export default function Hosting() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="infra" ref={ref} className="relative border-y border-line bg-panel/40 py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-4 font-mono text-sm text-accent">{'// infraestrutura'}</p>
        <div className="grid gap-12 lg:grid-cols-2">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="font-display text-4xl leading-tight uppercase md:text-5xl"
          >
            Publicação e gestão de <span className="text-accent">VPS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="self-center text-lg text-white/60"
          >
            Além de desenvolver, eu coloco e mantenho o projeto no ar: servidores
            VPS configurados do zero, com segurança, backups e monitoramento —
            nas principais hospedagens do mercado.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
              className="rounded-2xl border border-line bg-panel p-7"
            >
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-lg uppercase">{item.title}</h3>
              <p className="mt-3 text-sm text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <p className="mb-8 text-center font-mono text-xs tracking-widest text-white/40 uppercase">
            Experiência com as principais hospedagens
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {PROVIDERS.map((p) => (
              <img
                key={p.name}
                src={p.src}
                alt={p.name}
                title={p.name}
                loading="lazy"
                className="h-7 w-auto opacity-50 brightness-0 invert transition-opacity duration-300 hover:opacity-100 md:h-8"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
