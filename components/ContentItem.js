export default function ContentItem({ children, title1, title2 }) {
  return (
    <div className="py-20">
      <div className="flex flex-col items-center">
        <div
          className="mb-3 text-4xl 
                font-extrabold text-black  dark:text-white"
        >
          {title1 && <span>{title1} </span>}
          <span className="custom-title text-white dark:text-black">{title2}</span>
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
