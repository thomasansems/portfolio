import Image from './Image'
import Link from './Link'

import useTranslation from 'next-translate/useTranslation'

const MinCard = ({ title, tools, imgSrc }) => {
  const { t } = useTranslation()
  return (
    <div className="md py-4" style={{ maxWidth: '644px' }}>
      <div className="flex items-center overflow-hidden">
        {imgSrc && (
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center"
            width={250}
            height={100}
          />
        )}
        <div className="py-0 px-0 md:ml-5">
          <h3 className="mb-1 text-2xl font-bold leading-8 tracking-tight">{title}</h3>
          <div className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
            {tools.map((tool) => (
              <span className="mr-2" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MinCard
