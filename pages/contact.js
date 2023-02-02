import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'
import useTranslation from 'next-translate/useTranslation'
import SocialIcon from '@/components/social-icons'

export async function getStaticProps({ locale, locales }) {
  return { props: { locale, availableLocales: locales } }
}

export default function Contact({ locale, availableLocales }) {
  const { t } = useTranslation()
  return (
    <>
      <PageSEO
        title={`${t('headerNavLinks:contact')} - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div>
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('contact:title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('contact:subtitle')}
          </p>
        </div>
        <div className="container py-6">
          <div className="flex flex-wrap">
            <div className="mb-3 flex justify-center space-x-4">
              <SocialIcon kind="mail" href={siteMetadata.mail} size="8" />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size="8" />
              <SocialIcon kind="twitter" href={siteMetadata.twitter} size="8" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
