import { FC } from 'react'
import Typography from './Typography'

const Title: FC = () => {
  return (
    <div className="grid gap-y-4 justify-items-center col-span-12 md:col-span-4 md:justify-self-start md:justify-items-start">
      <Typography type="title">Korin</Typography>
      <Typography type="title" className="font-bold">
        Andrii
      </Typography>
      <Typography type="subtitle">Frontend Software Engineer</Typography>
    </div>
  )
}

export default Title
