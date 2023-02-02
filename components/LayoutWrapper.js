import { useRef } from 'react'
/* eslint-disable jsx-a11y/no-onchange */
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import SectionContainer from './SectionContainer'
import Footer from './Footer'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false })

const LayoutWrapper = ({ children }) => {
  const ref = useRef()
  const { t } = useTranslation()
  const router = useRouter()
  const { locale, locales, defaultLocale } = router

  const changeLanguage = (e) => {
    const locale = e.target.value
    router.push(router.asPath, router.asPath, { locale })
  }

  return (
    <SectionContainer>
      <div className="fixed left-0 top-0 z-0 h-full w-full opacity-20" ref={ref}>
        <Scene eventSource={ref} eventPrefix="client" />
      </div>
      <div className="relative z-10 flex h-screen flex-col justify-between">
        <header className="flex items-center justify-center py-10">
          <div className="flex items-center text-base leading-5">
            <div className="hidden sm:block">
              {headerNavLinks.map((link) => (
                <Link
                  key={link.title}
                  href={link.href}
                  className="p-1 font-medium text-gray-900 dark:text-gray-100 sm:p-4"
                >
                  {t(`headerNavLinks:${link.title.toLowerCase()}`)}
                </Link>
              ))}
            </div>
            <select
              onChange={changeLanguage}
              defaultValue={locale}
              style={{ textAlignLast: 'center' }}
              className="text-shadow-sm bg-transparent text-sm tracking-wide text-gray-900 dark:text-gray-100"
            >
              {locales.map((e) => (
                <option value={e} key={e}>
                  {e}
                </option>
              ))}
            </select>
            <ThemeSwitch />
            <MobileNav />
          </div>
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

// Canvas components go here
// It will receive same props as the Page component (from getStaticProps, etc.)
// LayoutWrapper.canvas = (props) => <Logo scale={0.5} route='/contact' position-y={-1} />

export default LayoutWrapper
