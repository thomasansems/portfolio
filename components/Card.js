import Image from './Image'
import Link from './Link'

import useTranslation from 'next-translate/useTranslation'

const Card = ({ title, description, imgSrc, href, moreInfoText, logoSrc }) => {
  const { t } = useTranslation()
  return (
    <div className="md p-4 md:w-1/2" style={{ maxWidth: '644px' }}>
      <div className={`${imgSrc && 'h-full'}  overflow-hidden `}>
        {imgSrc &&
          (href ? (
            <Link href={href} aria-label={`Link to ${title}`} className="relative">
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center opacity-100 md:h-36 lg:h-48"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center opacity-30 md:h-36 lg:h-48"
              width={544}
              height={306}
            />
          ))}
        <div className="py-6 px-0">
          {logoSrc && (
            <div className=" float-right">
              <Image alt={title} src={logoSrc} className="" width={170} height={76} />
            </div>
          )}

          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {href ? (
              <Link href={href} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          {href && (
            <Link
              href={href}
              className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label={`Link to ${title}`}
            >
              {moreInfoText} &rarr;
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Card
