import { FC } from 'react'
import Typography from './Typography'
import Section from './Section'

interface IEducationItem {
  name: string
  place: string
  date: string
  location: string
}
const EducationItem: FC<IEducationItem> = ({ location, name, date, place }) => {
  return (
    <div>
      <Typography type="subtitle" className="font-bold">
        {name}
      </Typography>
      <Typography>{place}</Typography>
      <div className="flex justify-between mt-2">
        <Typography type="sm">{date}</Typography>
        <Typography type="sm">{location}</Typography>
      </div>
    </div>
  )
}

const Education: FC = () => {
  return (
    <Section title="Education" className="col-span-12">
      <div className=" grid gap-y-4">
        <EducationItem
          name="WebUI course"
          location="Lviv, Ukraine"
          date="07/2018 - 10/2018"
          place="SoftServe academy"
        />
        <EducationItem
          date="09/2010 - 06/2015"
          location="Ternopil, Ukraine"
          name="Master's Degree in History"
          place="Ternopil National Pedagogical University"
        />
      </div>
    </Section>
  )
}

export default Education
