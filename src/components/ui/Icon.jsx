import clsx from 'clsx'

export default function Icon({ icon: LucideIcon, className, ...props }) {
  return <LucideIcon className={clsx('h-5 w-5', className)} {...props} />
}
