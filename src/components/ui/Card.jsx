import clsx from 'clsx'

export default function Card({ children, className, ...props }) {
  return (
    <div className={clsx('rounded-lg p-4', className)} {...props}>
      {children}
    </div>
  )
}
