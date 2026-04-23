import clsx from 'clsx'

export default function Button({ children, className, ...props }) {
  return (
    <button className={clsx('px-4 py-2', className)} {...props}>
      {children}
    </button>
  )
}
