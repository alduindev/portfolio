export default function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)]">
      <h3 className="mb-[0.55rem] text-[0.98rem] font-semibold">{title}</h3>
      <p className="text-[0.88rem] text-[var(--muted)]">{text}</p>
    </div>
  )
}
