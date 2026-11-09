import { ButtonLink } from '@/shared/ui/Button'
import { GitHubIcon, LinkedInIcon } from '@/shared/ui/icons'
import { profile } from '@/config/profile'

const external = { target: '_blank', rel: 'noopener noreferrer' } as const

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="border-t border-line py-14">
      <h2 id="about-heading" className="text-2xl font-semibold tracking-tight">
        About {profile.name}
      </h2>
      <p className="mt-3 text-muted">Backend engineer focused on:</p>
      <ul className="mt-4 space-y-1.5 border-l border-line-strong pl-4">
        {profile.focus.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={profile.links.github} {...external}>
          <GitHubIcon />
          GitHub
        </ButtonLink>
        <ButtonLink href={profile.links.linkedin} {...external}>
          <LinkedInIcon />
          LinkedIn
        </ButtonLink>
      </div>
    </section>
  )
}
