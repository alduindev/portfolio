export default function InfoCard({ title, text }) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl transition-all after:absolute after:right-0 after:top-0 after:h-3 after:w-3 after:border-r-2 after:border-t-2 after:border-[var(--accent)] hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_0_24px_rgba(173,198,255,.08)]">
      <h3 className="mb-[0.55rem] text-[0.98rem] font-semibold">{title}</h3>
      <p className="text-[0.88rem] text-[var(--muted)]">{text}</p>
    </div>
  )
}
