import Github from './github.svg'
import Linkedin from './linkedin.svg'
import Twitter from './twitter.svg'
import Mail from './mail.svg'
import Link from 'next/link'

// Icons taken from: https://simpleicons.org/

const components = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <Link legacyBehavior href={href}>
      <a
        className="block cursor-pointer text-sm text-gray-500 transition hover:text-gray-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="sr-only">{kind}</span>
        <SocialSvg
          className={`fill-current text-gray-700 hover:text-primary-600 dark:text-primary-400 dark:text-gray-200 dark:text-primary-400 dark:hover:text-primary-600 h-${size} w-${size}`}
        />
      </a>
    </Link>
  )
}

export default SocialIcon
