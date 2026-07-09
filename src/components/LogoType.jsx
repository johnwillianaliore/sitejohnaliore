import { useEffect, useState } from 'react'

const NAME = 'John-Aliore'
const TYPE_MS = 90
const DELETE_MS = 45
const HOLD_OPEN_MS = 2600
const HOLD_CLOSED_MS = 3600

// Logo animado: <[-]> abre digitando <[John-Aliore]> e fecha de volta.
export default function LogoType() {
  const [text, setText] = useState('-')

  useEffect(() => {
    let i = 0
    let phase = 'closed' // closed -> typing -> open -> deleting -> closed
    let timer

    const tick = () => {
      if (phase === 'closed') {
        phase = 'typing'
        i = 0
        setText('')
        timer = setTimeout(tick, TYPE_MS)
      } else if (phase === 'typing') {
        i += 1
        setText(NAME.slice(0, i))
        if (i >= NAME.length) {
          phase = 'open'
          timer = setTimeout(tick, HOLD_OPEN_MS)
        } else {
          timer = setTimeout(tick, TYPE_MS)
        }
      } else if (phase === 'open') {
        phase = 'deleting'
        timer = setTimeout(tick, DELETE_MS)
      } else if (phase === 'deleting') {
        i -= 1
        setText(NAME.slice(0, i))
        if (i <= 0) {
          phase = 'closed'
          setText('-')
          timer = setTimeout(tick, HOLD_CLOSED_MS)
        } else {
          timer = setTimeout(tick, DELETE_MS)
        }
      }
    }

    timer = setTimeout(tick, HOLD_CLOSED_MS)
    return () => clearTimeout(timer)
  }, [])

  return (
    <span className="font-mono text-lg font-medium whitespace-nowrap md:text-xl">
      <span className="text-accent">{'<['}</span>
      <span className={text === '-' ? 'animate-cursor text-white' : 'text-white'}>
        {text}
      </span>
      <span className="text-accent">{']>'}</span>
    </span>
  )
}
