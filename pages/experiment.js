import siteMetadata from '@/data/siteMetadata'
import experimentalData from '@/data/experimentalData'
import MiniCard from '@/components/MiniCard'
import { PageSEO } from '@/components/SEO'
import useTranslation from 'next-translate/useTranslation'

const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]))

export async function getStaticProps({ locale, locales }) {
  return { props: { locale, availableLocales: locales } }
}

export default function Experiment({ locale, availableLocales }) {
  const { t } = useTranslation()

  return (
    <>
      <PageSEO
        title={`${t('headerNavLinks:experiment')} - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div className="">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {t('experiment:title')}
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {t('experiment:subtitle')}
          </p>
        </div>
        <div className="container py-12">
          {Object.keys(experimentalData[locale])
            .reverse()
            .map((content, index) => (
              <div key={content}>
                <h2 className="mb-3 mt-6 text-4xl font-bold leading-8 tracking-tight">{content}</h2>
                {experimentalData[locale][content].map((content, index) => (
                  <MiniCard
                    key={index}
                    title={content.title}
                    tools={content.tools}
                    imgSrc={content.imgSrc}
                    link={content.link}
                  />
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}
