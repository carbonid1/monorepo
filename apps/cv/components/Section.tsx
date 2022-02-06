import { FC } from 'react'
import Typography from './Typography'

interface ISection {
  className?: string
  title: string
}
const Section: FC<ISection> = ({ className, children, title }) => {
  return (
    <div className={className}>
      <Typography className="font-bold border-b-2 border-gray-900 mb-4 py-4" type="title2">
        {title}
      </Typography>
      {children}
    </div>
  )
}

export default Section
