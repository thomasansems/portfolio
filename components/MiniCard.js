import Image from './Image'
import Link from './Link'

import useTranslation from 'next-translate/useTranslation'

const MinCard = ({ title, tools, imgSrc, link }) => {
  const { t } = useTranslation()
  return (
    <div className="md py-4">
      <Link
        href={link}
        target="_blank"
        className="flex cursor-pointer flex-col overflow-hidden md:flex-row md:items-center"
      >
        {imgSrc && (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center"
            width={400}
            height={225}
          />
        )}
        <div className="py-0 px-0 pt-4 md:ml-5 md:pt-0">
          <h3 className="mb-1 text-2xl font-bold leading-8 tracking-tight">{title}</h3>
          <div className="mr-3 text-sm font-medium uppercase text-primary-600 dark:text-primary-400">
            {tools.map((tool) => (
              <span className="mr-3" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default MinCard
