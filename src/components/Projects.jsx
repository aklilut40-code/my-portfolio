import { Github, ExternalLink, ImageIcon } from 'lucide-react'
import { projects } from '../data/projects.js'
import Reveal from './Reveal.jsx'

function ProjectCard({ project }) {
  return (
    <article className="card tilt project" data-reveal>
      <div className="project__media">
        {project.image ? (
          <img src={project.image} alt={`${project.name} screenshot`} loading="lazy" />
        ) : (
          <div className="project__placeholder" role="img" aria-label={`${project.name} screenshot placeholder`}>
            <ImageIcon size={32} />
            <span>Screenshot coming soon</span>
          </div>
        )}
      </div>

      <div className="project__body">
        <h3>{project.name}</h3>
        <p>{project.description}</p>

        <ul className="project__tech">
          {project.tech.map((t) => (
            <li key={t} className="chip chip--sm">{t}</li>
          ))}
        </ul>

        <div className="project__actions">
          {project.github ? (
            <a
              className="btn btn--ghost btn--sm"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={16} /> GitHub
            </a>
          ) : (
            <button className="btn btn--ghost btn--sm" disabled title="Repository link coming soon">
              <Github size={16} /> GitHub soon
            </button>
          )}
          {project.demo ? (
            <a
              className="btn btn--primary btn--sm"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Reveal as="header" className="section__head">
          <p className="section__eyebrow">Featured Projects</p>
          <h2 className="section__title">Things I&apos;ve been building</h2>
          <p className="section__sub">
            Practical projects that turn what I learn into working software.
          </p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  )
}
