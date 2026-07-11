import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { trackEvent } from '../lib/analytics'

const WHATSAPP_URL =
  'https://wa.me/5519995793431?text=' +
  encodeURIComponent('Olá gostaria de cotar um projeto com John Aliore.')

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label="Cotar um projeto pelo WhatsApp"
          onClick={() =>
            trackEvent('whatsapp_click', { location: 'floating_button' })
          }
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed right-6 bottom-6 z-50 flex items-center gap-3"
        >
          <span className="pointer-events-none hidden rounded-full border border-line bg-panel px-4 py-2 font-mono text-xs text-white/80 opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100 md:block">
            Cotar um projeto
          </span>
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent shadow-lg shadow-accent/30">
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-20" />
            <svg
              viewBox="0 0 24 24"
              fill="var(--color-line)"
              className="relative h-7 w-7"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
