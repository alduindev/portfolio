export default function ExperienceCard({ role }) {
  return (
    <article className="grid gap-5 rounded-lg border border-[var(--border)] border-l-[3px] border-l-[var(--accent)] bg-[var(--surface)] p-6 backdrop-blur-xl transition-all hover:border-[var(--accent)] hover:shadow-[0_0_28px_rgba(173,198,255,.08)] md:grid-cols-[0.85fr_2.15fr] md:p-8">
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
