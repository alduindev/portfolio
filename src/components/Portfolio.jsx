import { useState, useEffect, useRef, useCallback } from 'react'
import Reveal from './Reveal'
import SectionHeader from './SectionHeader'
import ExperienceCard from './ExperienceCard'
import InfoCard from './InfoCard'
import ProjectCard from './ProjectCard'
import { localeData, experienceData, stackData, projectsData } from '../data'

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')
  const [timelineExpanded, setTimelineExpanded] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [fading, setFading] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const [locale, setLocale] = useState('es')
  const [theme, setTheme] = useState('dark')

  const t = localeData[locale]
  const experience = experienceData[locale]
  const stack = stackData[locale]
  const projects = projectsData[locale]

  const railItems = t.railItems

  const sectionRefs = useRef({})

  const setSectionRef = useCallback((id) => (el) => {
    if (el) sectionRefs.current[id] = el
  }, [])

  // Scroll-spy for the side rail / mobile progress bar
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      setScrollPct(Number.isFinite(pct) ? pct : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Rotating hero tagline (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return undefined
    const interval = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setPhraseIndex((i) => (i + 1) % t.taglines.length)
        setFading(false)
      }, 280)
    }, 4200)
    return () => clearInterval(interval)
  }, [t])

  const scrollTo = (id) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.pageTitle
    setPhraseIndex(0)
  }, [locale, t.pageTitle])

  const visibleRoles = timelineExpanded ? experience : experience.filter((r) => !r.hidden)

  return (
    <div className="relative min-h-screen bg-[var(--bg)] font-[Inter,sans-serif] text-[var(--text)]">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="fixed inset-x-0 top-0 z-[70] h-[2px] bg-[var(--panel)] lg:hidden">
        <div className="h-full bg-[var(--accent-strong)] transition-[width] duration-150" style={{ width: `${scrollPct}%` }} />
      </div>

      <header className="fixed inset-x-0 top-0 z-[60] border-b border-[var(--border)] bg-[var(--bg)]/[0.92] backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-4 px-6 md:px-12 lg:px-20">
          <button onClick={() => scrollTo('inicio')} className="font-[Sora,sans-serif] text-[1.05rem] font-bold tracking-[-.04em] text-[var(--accent-strong)]">
            UC
          </button>
          <nav className="hidden gap-8 font-mono text-[0.75rem] uppercase tracking-[.08em] text-[var(--muted)] md:flex">
            {['sobre-mi', 'experiencia', 'stack', 'proyectos'].map((id) => (
              <button key={id} onClick={() => scrollTo(id)} className="capitalize transition-colors hover:text-[var(--text)]">
                {railItems.find((r) => r.id === id)?.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
              <button
                onClick={() => setLocale((current) => (current === 'es' ? 'en' : 'es'))}
                className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-[0.82rem] font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                {t.languageButton}
              </button>
              <button
                onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
                className="rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-2 text-[0.82rem] font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
              >
                {theme === 'dark' ? t.themeButtonLight : t.themeButtonDark}
              </button>
              <button
                onClick={() => scrollTo('contacto')}
                className="hidden rounded-full border border-[var(--border-strong)] px-[1.15rem] py-[0.55rem] text-[0.88rem] font-medium transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 md:inline-block"
              >
                {t.talkButton}
              </button>
            <button
              aria-label={menuOpen ? t.closeMenuLabel : t.openMenuLabel}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
                className="relative h-[2.2rem] w-[2.2rem] flex-none rounded-[0.6rem] border border-[var(--border-strong)] md:hidden"
            >
                <span className={`absolute left-2 right-2 top-1/2 h-[1.5px] -translate-y-1/2 bg-[var(--text)] transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`absolute left-2 right-2 top-1/2 h-[1.5px] bg-[var(--text)] transition-transform ${menuOpen ? 'translate-y-0 rotate-45' : '-translate-y-[6px]'}`} />
                <span className={`absolute left-2 right-2 top-1/2 h-[1.5px] bg-[var(--text)] transition-transform ${menuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-[6px]'}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-[var(--bg)]/[0.97] px-8 pb-8 pt-28 backdrop-blur-md transition-all duration-300 md:hidden ${
          menuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
        }`}
      >
          {['sobre-mi', 'experiencia', 'stack', 'proyectos', 'contacto'].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="block w-full border-b border-[var(--border)] py-[0.7rem] text-left font-serif text-[1.7rem] font-medium text-[var(--text)]"
          >
            {railItems.find((r) => r.id === id)?.label}
          </button>
        ))}
        <button onClick={() => scrollTo('contacto')} className="mt-6 inline-block rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-white">
          {t.talkButton}
        </button>
      </div>

      <nav aria-label={t.sectionsNavLabel} className="fixed left-9 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-start gap-[1.55rem] xl:flex">
        <div className="pointer-events-none absolute bottom-1.5 left-[3px] top-1.5 w-px bg-[var(--border)]" />
        {railItems.map((item) => {
          const active = activeSection === item.id
          return (
            <button key={item.id} onClick={() => scrollTo(item.id)} className="group flex items-center gap-[0.7rem]">
              <span
                className="h-[7px] w-[7px] rounded-full border transition-all"
                style={{
                  background: active ? 'var(--accent-strong)' : 'var(--muted)',
                  boxShadow: active ? '0 0 0 1px var(--accent-strong), 0 0 14px rgba(155,92,242,0.14)' : '0 0 0 1px rgba(255,255,255,0.18)',
                  transform: active ? 'scale(1.3)' : 'scale(1)',
                }}
              />
              <span
                className="whitespace-nowrap font-mono text-[0.7rem] uppercase tracking-[0.1em] opacity-0 transition-all group-hover:opacity-100"
                style={{ color: active ? 'var(--accent-strong)' : 'var(--muted)', opacity: active ? 1 : undefined }}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>

      <main className="relative z-[1]">
        <section id="inicio" ref={setSectionRef('inicio')} className="border-b border-[var(--border)] px-6 pb-20 pt-32 md:px-12 lg:px-20 lg:pb-28">
          <div className="mx-auto grid min-h-[70vh] max-w-[1400px] items-center gap-14 md:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-5 flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[var(--success)]">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--success)] shadow-[0_0_10px_var(--success)]" />
                {t.heroRole}
              </p>
              <h1 className="font-[Sora,sans-serif] text-[clamp(2.25rem,5vw,3.5rem)] font-bold leading-[1.08] tracking-[-.035em]">
                Uriel Cabada
                <br />
                <span
                  className="mt-2 block min-h-[1.3em] font-[Sora,sans-serif] text-[clamp(1.25rem,2.6vw,1.75rem)] font-normal text-[var(--accent-strong)] transition-opacity duration-300"
                  style={{ opacity: fading ? 0 : 1 }}
                >
                  {t.taglines[phraseIndex].lede}
                </span>
              </h1>
              <p
                className="mt-[0.9rem] min-h-[1.4em] font-mono text-[0.85rem] uppercase tracking-[0.14em] text-[var(--accent)] opacity-95 transition-opacity duration-300"
                style={{ opacity: fading ? 0 : 0.95 }}
              >
                {t.taglines[phraseIndex].sub}
              </p>
              <p className="my-[1.6rem] max-w-[46ch] text-[1.04rem] text-[var(--muted)]">
                {t.heroText}
              </p>
              <div className="flex flex-wrap gap-[0.9rem]">
                <button onClick={() => scrollTo('proyectos')} className="rounded bg-[var(--accent-strong)] px-6 py-[0.8rem] font-mono text-[0.82rem] font-semibold text-[#002e6a] transition-all hover:shadow-[0_0_24px_rgba(173,198,255,.22)]">
                  {t.projectsButton}
                </button>
                <button onClick={() => scrollTo('contacto')} className="rounded border border-[var(--border-strong)] px-6 py-[0.8rem] font-mono text-[0.82rem] font-medium transition-colors hover:border-[var(--accent-strong)] hover:bg-[var(--panel)] hover:text-[var(--accent-strong)]">
                  {t.talkButton}
                </button>
              </div>
            </div>

            <div className="group relative w-full max-w-[420px] justify-self-center rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] p-3 shadow-[0_0_50px_rgba(77,142,255,.08)] backdrop-blur-xl after:absolute after:right-0 after:top-0 after:h-4 after:w-4 after:border-r-2 after:border-t-2 after:border-[var(--accent-strong)] md:p-4">
              <div className="relative aspect-square overflow-hidden rounded border border-[var(--border)] bg-[var(--surface-alt)]">
                <img
                  src={`${import.meta.env.BASE_URL}profile.PNG`}
                  alt={t.profileAlt}
                  className="relative z-[1] h-full w-full object-cover object-top transition-transform duration-[6000ms] ease-out group-hover:scale-[1.04]"
                  style={{ filter: 'grayscale(0.45) contrast(1.08) brightness(0.96)' }}
                />
                <div
                  className="pointer-events-none absolute inset-0 z-[2]"
                  style={{
                    background: 'linear-gradient(165deg, var(--surface) 0%, transparent 45%, rgba(11,13,16,0.55) 100%)',
                    mixBlendMode: 'multiply',
                  }}
                />
              </div>
              <div className="flex items-center justify-between px-[0.2rem] pb-[0.3rem] pt-[0.95rem]">
                <span className="text-[0.85rem] text-[var(--muted)]">{t.location}</span>
                <span className="flex items-center gap-[0.45rem] font-mono text-[0.72rem] uppercase tracking-[0.08em] text-[var(--success)]">
                  <span className="h-[6px] w-[6px] rounded-full bg-[var(--success)]" style={{ boxShadow: '0 0 8px var(--success)' }} />
                  {t.openLabel}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre-mi" ref={setSectionRef('sobre-mi')} className="border-b border-[var(--border)] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader label={t.aboutLabel} title={t.aboutHeadline} />
            <Reveal className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-[1.9rem] backdrop-blur-xl">
                <p className="mb-[0.9rem] text-[var(--muted)]">{t.aboutText1}</p>
                <p className="text-[var(--muted)]">{t.aboutText2}</p>
              </div>
              <div className="flex flex-col gap-6">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl">
                  <h3 className="mb-[0.6rem] text-[1rem] font-semibold text-[var(--accent)]">{t.professionalTitle}</h3>
                  <p className="text-[0.92rem] text-[var(--muted)]">{t.professionalText}</p>
                </div>
                <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 backdrop-blur-xl">
                  <h3 className="mb-[0.6rem] text-[1rem] font-semibold text-[var(--accent)]">{t.lifeTitle}</h3>
                  <p className="text-[0.92rem] text-[var(--muted)]">{t.lifeText}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="experiencia" ref={setSectionRef('experiencia')} className="border-b border-[var(--border)] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader label={t.experienceLabel} title={t.experienceHeadline} />

            <Reveal className="flex flex-col gap-[1.1rem]" as="div">
              {visibleRoles.map((role) => (
                <ExperienceCard key={role.title} role={role} />
              ))}
            </Reveal>

            <button
              onClick={() => setTimelineExpanded((v) => !v)}
              className="mt-[1.3rem] rounded-full border border-[var(--border-strong)] px-[1.2rem] py-[0.6rem] text-[0.85rem] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {timelineExpanded ? t.viewLessLabel : t.viewFullLabel}
            </button>

            <Reveal className="mt-6 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-[1.9rem] backdrop-blur-xl" as="div">
              <h3 className="mb-[0.6rem] text-[1rem] font-semibold text-[var(--accent)]">{t.additionalExperienceTitle}</h3>
              <p className="text-[0.92rem] text-[var(--muted)]">{t.additionalExperience}</p>
            </Reveal>
          </div>
        </section>

        <section id="stack" ref={setSectionRef('stack')} className="border-b border-[var(--border)] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader label={t.stackLabel} title={t.stackHeadline} />
            <Reveal className="grid gap-[1.1rem] sm:grid-cols-2 lg:grid-cols-3">
              {stack.map((card) => (
                <InfoCard key={card.title} title={card.title} text={card.text} />
              ))}
            </Reveal>
          </div>
        </section>

        <section id="ia" ref={setSectionRef('ia')} className="border-b border-[var(--border)] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader label={t.iaLabel} title={t.iaHeadline} />
            <Reveal className="grid items-center gap-10 rounded-lg border border-[var(--border-strong)] p-7 backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:p-10" style={{ background: 'linear-gradient(135deg, rgba(173,198,255,.09), var(--surface) 48%, rgba(78,222,163,.04))' }}>
              <p className="font-serif text-[clamp(1.3rem,2.4vw,1.7rem)] font-normal italic leading-[1.35]">
                {t.iaQuoteBefore} <span className="text-[var(--accent-strong)]">{t.iaQuoteHighlight}</span>{t.iaQuoteAfter}
              </p>
              <ul>
                {t.iaList.map((item) => (
                  <li key={item} className="relative mb-[0.7rem] pl-[1.1rem] text-[0.93rem] text-[var(--muted)] last:mb-0">
                    <span className="absolute left-0 top-[0.55em] h-[5px] w-[5px] rounded-full bg-[var(--accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
        <section id="proyectos" ref={setSectionRef('proyectos')} className="border-b border-[var(--border)] px-6 py-20 md:px-12 lg:px-20 lg:py-28">
          <div className="mx-auto max-w-[1400px]">
            <SectionHeader label={t.projectsLabel} title={t.projectsHeadline} />
            <Reveal className="grid gap-[1.1rem] lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </Reveal>
          </div>
        </section>
      </main>

      <footer id="contacto" ref={setSectionRef('contacto')} className="px-6 py-20 md:px-12 lg:px-20 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <p className="mb-[0.9rem] font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[var(--accent)]">{t.contactLabel}</p>
              <h2 className="max-w-[32ch] font-serif text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-[1.25]">{t.contactHeadline}</h2>
            </div>
            <a
              href="mailto:urielcabadat@hotmail.com"
              className="inline-block rounded-full bg-[var(--accent)] px-6 py-[0.8rem] text-[0.94rem] font-medium text-white transition-colors hover:bg-[var(--accent-strong)]"
            >
              {t.contactButton}
            </a>
          </Reveal>
          <div className="mt-14 flex flex-wrap justify-between gap-3 border-t border-[var(--border)] pt-6 text-[0.82rem] text-[var(--muted)]">
            <span>© 2026 Uriel Cabada</span>
            <span>{t.footerLocation}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
