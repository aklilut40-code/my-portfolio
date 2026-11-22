import { useEffect } from 'react'

/**
 * One delegated listener that powers two effects on every `.card`:
 *  - a soft spotlight that follows the cursor (CSS vars --mx / --my)
 *  - a gentle 3D tilt on cards that also have the `.tilt` class (--rx / --ry)
 * Disabled for touch input and when the user prefers reduced motion.
 */
export function useInteractiveCards() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce || !fine) return

    const onMove = (e) => {
      const card = e.target.closest?.('.card')
      if (!card) return
      const r = card.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      card.style.setProperty('--mx', `${x}px`)
      card.style.setProperty('--my', `${y}px`)
      if (card.classList.contains('tilt')) {
        card.style.setProperty('--ry', `${((x / r.width) - 0.5) * 8}deg`)
        card.style.setProperty('--rx', `${(0.5 - (y / r.height)) * 8}deg`)
      }
    }

    const onLeave = (e) => {
      const card = e.target.closest?.('.card.tilt')
      if (!card) return
      card.style.setProperty('--rx', '0deg')
      card.style.setProperty('--ry', '0deg')
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onLeave, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onLeave)
    }
  }, [])
}
