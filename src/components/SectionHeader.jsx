import Reveal from './Reveal'

export default function SectionHeader({ label, title, className = '' }) {
  return (
    <Reveal className={`mb-10 flex flex-col gap-3 border-l-2 border-[var(--accent)] pl-4 md:mb-12 md:grid md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-10 ${className}`.trim()}>
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--accent)]">{label}</p>
      <h2 className="font-[Sora,sans-serif] text-[clamp(1.55rem,3vw,2.15rem)] font-semibold leading-tight">{title}</h2>
    </Reveal>
  )
}
