import { FC } from 'react'
import cn from 'classnames'

type TTypography = 'title' | 'title2' | 'subtitle' | 'sm'
const getClassNames = (type: TTypography | undefined): string => {
  switch (type) {
    case 'title':
      return 'text-6xl tracking-wide'
    case 'title2':
      return 'text-2xl tracking-wide'
    case 'subtitle':
      return 'text-xl tracking-wide'
    case 'sm':
      return 'text-sm tracking-wide'
    default:
      return ''
  }
}

interface ITypography {
  type?: TTypography
  className?: string
  children: React.ReactNode
}
const Typography: FC<ITypography> = ({ children, type, className }) => {
  return <div className={cn(getClassNames(type), className)}>{children}</div>
}

interface ILinkTypography {
  href: string
  type?: TTypography
  className?: string
  onClick?: JSX.IntrinsicElements['a']['onClick']
  children: React.ReactNode
}
export const LinkTypography: FC<ILinkTypography> = ({
  href,
  type,
  onClick,
  children,
  className,
}) => {
  return (
    <a
      className={cn(getClassNames(type), className)}
      href={href}
      target="_blank"
      onClick={onClick}
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export default Typography
