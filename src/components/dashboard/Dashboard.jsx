import { useEffect, useRef } from 'react'
import { ArrowLeft, X, ChevronRight } from 'lucide-react'
import { profile, github } from '../../data/profile.js'
import { projects } from '../../data/projects.js'
import { skillGroups } from '../../data/skills.js'
import { useGithubRepos } from '../../hooks/useGithubRepos.js'
import { useDashboard } from '../../context/DashboardContext.jsx'
import { dashboardPages, pageComponents } from './DashboardPages.jsx'

function Hub() {
  const { open, close } = useDashboard()
  const { status, repos } = useGithubRepos(github.username)
  const techCount = skillGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <div className="dash__hero">
        <img src={profile.photo} alt={profile.photoAlt} width="72" height="72" />
        <div>
          <h2>{profile.fullName}</h2>
          <p>{profile.degree} · {profile.university}</p>
        </div>
      </div>
      <p className="dash__tagline">{profile.tagline}</p>

      <div className="dash__stats">
        <div><strong>{projects.length}</strong><span>Projects</span></div>
        <div><strong>{status === 'ready' ? repos.length : '–'}</strong><span>GitHub repos</span></div>
        <div><strong>{techCount}</strong><span>Technologies</span></div>
      </div>

      <h3 className="dash__heading">Pages</h3>
      <ul className="dash__tiles">
        {dashboardPages.map(({ id, label, icon: Icon, desc }) => (
          <li key={id}>
            <button className="dash__tile" onClick={() => open(id)}>
              <span className="icon-badge icon-badge--lg"><Icon size={22} /></span>
              <strong>{label}</strong>
              <small>{desc}</small>
              <ChevronRight size={16} className="dash__tile-arrow" aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>

      <button className="btn btn--ghost dash__exit" onClick={close}>Back to portfolio</button>
    </>
  )
}

export default function Dashboard() {
  const { view, back, close } = useDashboard()
  const bodyRef = useRef(null)

  // Lock page scroll behind the dashboard, close on Escape.
  useEffect(() => {
    if (!view) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [view, close])

  // Each page starts at the top.
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = 0
  }, [view])

  if (!view) return null

  const isHub = view === 'home'
  const meta = dashboardPages.find((p) => p.id === view)
  const Page = pageComponents[view]

  return (
    <div className="dash" role="dialog" aria-modal="true" aria-label="Dashboard">
      <header className="dash__bar">
        {isHub ? (
          <span className="dash__bar-title">Dashboard</span>
        ) : (
          <button className="dash__icon-btn" onClick={back} aria-label="Back to dashboard">
            <ArrowLeft size={22} />
          </button>
        )}
        {!isHub && <span className="dash__bar-title">{meta?.label}</span>}
        <button className="dash__icon-btn" onClick={close} aria-label="Close dashboard">
          <X size={22} />
        </button>
      </header>

      <div className="dash__body" ref={bodyRef}>
        <div className="dash__page" key={view}>
          {isHub ? <Hub /> : Page ? <Page /> : null}
        </div>
      </div>
    </div>
  )
}
