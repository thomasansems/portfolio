export default function ContentItem({ children, title1, title2 }) {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center">
        <div
          className="mb-3 text-4xl 
                font-extrabold text-black  dark:text-white "
        >
          {title1} {title2}
        </div>
      </div>
      <div>{children}</div>
    </div>
  )
}
