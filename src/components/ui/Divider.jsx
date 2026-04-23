import clsx from 'clsx'

export default function Divider({ className }) {
  return <hr className={clsx('my-8 border-t', className)} />
}
