import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import { useRouter } from 'next/router'

export default function Footer() {
  const { locale } = useRouter()
  const size = 6
  return (
    <footer>
      <div className="mb-3 flex justify-center space-x-4">
        <SocialIcon kind="github" href={siteMetadata.github} size="5" />
        <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="5" />
        <SocialIcon kind="twitter" href={siteMetadata.twitter} size="5" />
      </div>
      <div className={`mt-16 mb-4 flex flex-col `}>
        <div className="mb-6 flex justify-center space-x-2 text-sm text-gray-800 dark:text-gray-100">
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title[locale]}</Link>
        </div>
      </div>
    </footer>
  )
}
