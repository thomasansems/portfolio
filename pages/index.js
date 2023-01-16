import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import useTranslation from 'next-translate/useTranslation'
import meJpg from '@/data/me.jpg'
import logoCentraalBeheer from '@/data/logos/centraalbeheer.png'
import logoPreZero from '@/data/logos/pre-zero.png'
import logoVivafloors from '@/data/logos/vivafloors.png'
import logoConnexxion from '@/data/logos/connexxion.png'
import logoNedap from '@/data/logos/nedap.png'
import logoWorkday from '@/data/logos/workday.png'
import Image from 'next/image'
import ContentItem from '@/components/ContentItem'

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

const WHATIDO = [
  {
    title: 'Front-end Development',
    description: 'I love to build beautiful and performant websites and web applications.',
    icon: '👨‍💻',
  },
  {
    title: 'Front-end Engineering',
    description: 'I love to build beautiful and performant websites and web applications.',
    icon: '👨‍💻',
  },
  {
    title: 'Node.js Development',
    description: 'I love to build beautiful and performant websites and web applications.',
    icon: '👨‍💻',
  },
  {
    title: 'Web 3.0 Development',
    description: 'I love to build beautiful and performant websites and web applications.',
  },
]

export async function getStaticProps({ locale, defaultLocale, locales }) {
  const otherLocale = locale !== defaultLocale ? locale : ''
  const posts = await getAllFilesFrontMatter('blog', otherLocale)

  return { props: { posts, locale, availableLocales: locales } }
}

export default function Home({ posts, locale, availableLocales }) {
  const { t } = useTranslation()

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
                Hi, I'm Thomas
              </div>
              <div className="text-center text-lg text-gray-500 dark:text-gray-400 md:text-left">
                Hey there! I'm Thomas Ansems and I hail from the Netherlands. As a senior{' '}
                <span className="font-bold text-gray-300">Web developer</span>, I get lost in my
                work and forget all about time because I love what I do! I also enjoy blending my
                passion for art and code by experimenting with new techniques and pushing
                boundaries.
              </div>
            </div>
          </div>
        </div>

        <ContentItem title1="What I" title2="do">
          <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
            <div className="grid grid-cols-1 gap-y-16 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
              {WHATIDO.map((item, key) => (
                <div
                  key={key}
                  className="relative flex flex-col items-center justify-center gap-6 sm:flex-row sm:items-start sm:justify-start md:flex-col lg:flex-row"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-300 text-black sm:shrink-0">
                    <svg
                      className="h-8 w-8"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                      />
                    </svg>
                  </div>
                  <div className="text-center sm:min-w-0 sm:flex-1 sm:text-left">
                    <p className="text-2xl font-semibold leading-8">{item.title}</p>
                    <p className="mt-2 text-base leading-7 text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentItem>

        <ContentItem title1="Clients I worked" title2="with">
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
              const { slug, date, title, summary, tags } = frontMatter
              return (
                <li key={slug} className="py-12">
                  <article>
                    <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                      <dl>
                        <dt className="sr-only">{t('common:pub')}</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
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
                            <div className="flex flex-wrap">
                              {tags.map((tag) => (
                                <Tag key={tag} text={tag} />
                              ))}
                            </div>
                          </div>
                          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                            {summary}
                          </div>
                        </div>
                        <div className="text-base font-medium leading-6">
                          <Link
                            href={`/blog/${slug}`}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
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
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            {t('common:all')} &rarr;
          </Link>
        </div>
      )}
    </>
  )
}
