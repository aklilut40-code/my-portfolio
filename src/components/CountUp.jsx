import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView.js'

/** Animates a number from 0 to `value` once it scrolls into view. */
export default function CountUp({ value, duration = 1200 }) {
  const [ref, inView] = useInView()
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || value === 0) {
      setN(value)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value, duration])

  return <span ref={ref}>{n}</span>
}
