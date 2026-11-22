import { useEffect, useState } from 'react'

/** Types and deletes each word in turn. Shows the first word statically for reduced-motion users. */
export default function Typewriter({ words }) {
  const [text, setText] = useState('')
  const [wi, setWi] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduce) return
    const word = words[wi]
    let delay = deleting ? 35 : 75
    if (!deleting && text === word) delay = 1500
    if (deleting && text === '') delay = 350

    const t = setTimeout(() => {
      if (!deleting && text === word) return setDeleting(true)
      if (deleting && text === '') {
        setDeleting(false)
        return setWi((wi + 1) % words.length)
      }
      setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, wi, words, reduce])

  return (
    <span className="typewriter" aria-label={words.join(', ')}>
      <span aria-hidden="true">{reduce ? words[0] : text}</span>
      {!reduce && <span className="typewriter__caret" aria-hidden="true" />}
    </span>
  )
}
