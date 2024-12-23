import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import meJpg from '@/data/me.jpg'
import logoCentraalBeheer from '@/data/logos/centraalbeheer.png'
import logoPreZero from '@/data/logos/pre-zero.png'
import logoVivafloors from '@/data/logos/vivafloors.png'
import logoConnexxion from '@/data/logos/connexxion.png'
import logoNedap from '@/data/logos/nedap.png'
import logoWorkday from '@/data/logos/workday.png'
import Image from 'next/image'
import ContentItem from '@/components/ContentItem'
import useTranslation from 'next-translate/useTranslation'
import { useEffect } from 'react'

const MAX_DISPLAY = 3

const LOGOS = [
  {
    title: 'Centraal Beheer',
    logo: logoCentraalBeheer,
  },
  {
    title: 'Workday',
    logo: logoWorkday,
  },
  {
    title: 'PreZero',
    logo: logoPreZero,
  },
  {
    title: 'Nedap',
    logo: logoNedap,
  },
  {
    title: 'Vivafloors',
    logo: logoVivafloors,
  },
  {
    title: 'Connexxion',
    logo: logoConnexxion,
  },
]

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()
  const doContent = t('index:do.content')

  return (
    <>
      <PageSEO
        title={siteMetadata.title[locale]}
        description={siteMetadata.description[locale]}
        availableLocales={availableLocales}
      />
      <div>
        <div>
          <div className="my-16 flex flex-col items-center justify-center md:flex-row">
            <div className="min-w-max md:mr-3">
              <Image
                src={meJpg}
                alt="Thomas Ansems"
                className="rounded-full"
                width={180}
                height={180}
              />
            </div>
            <div className="md:ml-5">
              <div className="mb-3 mt-4 text-center text-4xl font-extrabold md:text-left">
                {t('index:intro.title')}
              </div>
              <div className="text-center text-lg text-gray-800 dark:text-gray-100 md:text-left">
                {t('index:intro.content')}
              </div>
            </div>
          </div>
        </div>

        <ContentItem title1={t('index:do.title0')} title2={t('index:do.title1')}>
          <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
            <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
              {Array.apply(null, Array(5)).map((item, key) => (
                <div
                  key={key}
                  className="relative flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start sm:justify-start md:flex-col lg:flex-row"
                >
                  <div className="text-center sm:min-w-0 sm:flex-1 sm:text-left">
                    <p className="text-2xl font-semibold leading-8">
                      {t(`index:do.content.${key}.title`)}
                    </p>
                    <p className="mt-2 text-base leading-7 text-gray-800 dark:text-gray-100">
                      {t(`index:do.content.${key}.content`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentItem>

        <ContentItem title1={t('index:clients.title0')} title2={t('index:clients.title1')}>
          <div className="flex justify-center">
            <div className="grid max-w-3xl grid-cols-2 gap-4 pt-12 md:grid-cols-3">
              {LOGOS.map((item, key) => (
                <div key={key}>
                  <Image src={item.logo} alt={item.title} width={678 / 2} height={322 / 2} />
                </div>
              ))}
            </div>
          </div>
        </ContentItem>

        <ContentItem title2="Blog">
          <ul className="">
            {!posts.length && 'No posts found.'}
            {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
              const { slug, date, title, summary } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t('common:pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-800 dark:text-gray-100">
                          <time dateTime={date}>{formatDate(date, locale)}</time>
                        </dd>
                      </dl>
                      <div className="space-y-5 xl:col-span-3">
                        <div className="space-y-6">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight">
                              <Link
                                href={`/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                              >
                                {title}
                              </Link>
                            </h2>
                          </div>
                          <div className="prose max-w-none text-gray-800 dark:text-gray-100">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-600 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-400"
                            aria-label={`Read "${title}"`}
                          >
                            {t('common:more')} &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </ContentItem>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-600 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {t('common:all')} &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
