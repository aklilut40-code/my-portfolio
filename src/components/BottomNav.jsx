import { useEffect, useState } from 'react'
import { Home, Briefcase, LayoutDashboard, Github, Mail } from 'lucide-react'
import { useDashboard } from '../context/DashboardContext.jsx'

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, center: true },
  { id: 'github', label: 'GitHub', icon: Github },
  { id: 'contact', label: 'Contact', icon: Mail },
]

/** Android-style bottom tab bar. Shown only on phones (see mobile.css). */
export default function BottomNav() {
  const { open, view } = useDashboard()
  const [active, setActive] = useState('home')

  useEffect(() => {
    const ids = tabs.filter((t) => !t.center).map((t) => t.id)
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      {tabs.map(({ id, label, icon: Icon, center }) => {
        if (center) {
          return (
            <button
              key={id}
              className={`bottom-nav__item bottom-nav__item--center ${view ? 'is-active' : ''}`}
              onClick={() => open('home')}
              aria-label="Open dashboard"
            >
              <span className="bottom-nav__fab"><Icon size={24} /></span>
              <span>{label}</span>
            </button>
          )
        }
        return (
          <a
            key={id}
            href={`#${id}`}
            className={`bottom-nav__item ${active === id ? 'is-active' : ''}`}
            aria-current={active === id ? 'page' : undefined}
          >
            <Icon size={22} />
            <span>{label}</span>
          </a>
        )
      })}
    </nav>
  )
}
