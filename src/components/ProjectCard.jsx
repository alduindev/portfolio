function ProjectIcon({ type }) {
  if (type === 'landing') {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="6" y="14" width="44" height="30" rx="4" stroke="var(--accent-strong)" strokeWidth="1.5" />
        <path d="M6 20H50" stroke="var(--accent-strong)" strokeWidth="1.5" />
        <circle cx="11" cy="17" r="1.2" fill="var(--accent-strong)" />
        <circle cx="15" cy="17" r="1.2" fill="var(--accent-strong)" />
      </svg>
    )
  }

  if (type === 'dashboard') {
    return (
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <rect x="6" y="8" width="20" height="16" rx="3" stroke="var(--accent-strong)" strokeWidth="1.5" />
        <rect x="30" y="8" width="20" height="16" rx="3" stroke="var(--accent-strong)" strokeWidth="1.5" />
        <rect x="6" y="32" width="44" height="16" rx="3" stroke="var(--accent-strong)" strokeWidth="1.5" />
      </svg>
    )
  }

  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <circle cx="28" cy="28" r="20" stroke="var(--accent-strong)" strokeWidth="1.5" />
      <path d="M18 28H38" stroke="var(--accent-strong)" strokeWidth="1.5" />
      <path d="M28 18V38" stroke="var(--accent-strong)" strokeWidth="1.5" />
    </svg>
  )
}

export default function ProjectCard({ project }) {
  return (
    <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--surface)] p-[1.6rem] transition-all hover:-translate-y-1 hover:border-[var(--accent-strong)]">
      <div className="mb-[1.2rem] flex h-[8.5rem] items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface-alt)]">
        <ProjectIcon type={project.icon} />
      </div>
      <h3 className="mb-2 text-[1.05rem] font-semibold">{project.title}</h3>
      <p className="mb-4 text-[0.9rem] text-[var(--muted)]">{project.description}</p>
      <p className="font-mono text-[0.72rem] tracking-[0.04em] text-[var(--accent)]">{project.tags}</p>
    </div>
  )
}
