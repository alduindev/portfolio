export default function ExperienceCard({ role }) {
  return (
    <article className="grid gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 transition-colors hover:border-[var(--border-strong)] hover:bg-[var(--surface-alt)] md:grid-cols-[0.85fr_2.15fr]">
      <div>
        <h3 className="text-[1.08rem] font-semibold">{role.title}</h3>
        <p className="mt-[0.4rem] font-mono text-[0.76rem] uppercase tracking-[0.04em] text-[var(--muted)]">
          {role.dates}
          <br />
          {role.place}
        </p>
      </div>
      <div>
        <p className="mb-[0.85rem] text-[0.95rem] text-[var(--muted)]">{role.description}</p>
        {role.bullets.length > 0 && (
          <ul className="flex flex-col gap-[0.45rem]">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="relative pl-[1.1rem] text-[0.92rem] text-[var(--muted)]">
                <span className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
