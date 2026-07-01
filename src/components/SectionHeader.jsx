import Reveal from './Reveal'

export default function SectionHeader({ label, title, className = '' }) {
  return (
    <Reveal className={`mb-12 grid items-end gap-10 md:grid-cols-[0.85fr_1.15fr] ${className}`.trim()}>
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--accent)]">{label}</p>
      <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-tight">{title}</h2>
    </Reveal>
  )
}
