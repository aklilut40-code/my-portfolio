import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const DashboardContext = createContext({
  view: null,
  open: () => {},
  close: () => {},
  back: () => {},
  goToSection: () => {},
})

export const useDashboard = () => useContext(DashboardContext)

/**
 * Holds which dashboard page is open (null = closed) and ties it to the browser history,
 * so the Android / browser Back button steps back through dashboard pages and then closes it.
 */
export function DashboardProvider({ children }) {
  const [view, setView] = useState(null)

  useEffect(() => {
    // A reload while a dashboard entry is active should not leave a stale state behind.
    if (window.history.state?.dash) window.history.replaceState(null, '')
    const onPop = (e) => setView(e.state?.dash ?? null)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const open = useCallback((next = 'home') => {
    const depth = (window.history.state?.d || 0) + 1
    window.history.pushState({ dash: next, d: depth }, '')
    setView(next)
  }, [])

  const back = useCallback(() => window.history.back(), [])

  const close = useCallback(() => {
    const depth = window.history.state?.d
    if (depth) window.history.go(-depth)
    else setView(null)
  }, [])

  const goToSection = useCallback(
    (id) => {
      close()
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150)
    },
    [close]
  )

  const value = useMemo(
    () => ({ view, open, close, back, goToSection }),
    [view, open, close, back, goToSection]
  )
  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
}
