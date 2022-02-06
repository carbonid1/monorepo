import { FC } from 'react'
import Typography from './Typography'
import Section from './Section'
import ExternalLinkBtn, { IExternalLinkBtn } from './ExternalLinkBtn'

interface IProjectItem extends Pick<IExternalLinkBtn, 'href'> {
  title: string
  description: string
  date: string
}
const ProjectItem: FC<IProjectItem> = ({ title, description, date, href }) => {
  return (
    <div>
      <Typography type="subtitle" className="font-bold">
        {title}
        <Typography type="sm" className="inline-block ml-1">
          ({date})
        </Typography>
        <ExternalLinkBtn href={href} linkLabel={title} className="inline-block ml-1 align-middle" />
      </Typography>
      <Typography className="mt-2">{description}</Typography>
    </div>
  )
}

const PersonalProjects: FC = () => {
  return (
    <Section title="Personal Projects">
      <div className="grid gap-y-4">
        <ProjectItem
          date="2021"
          title="BookHub"
          description="Goodreads/Livelib like app to practice Next.js and SSR before using it on production. Together with PostgreSQL and GraphQL."
          href="https://book-hub.vercel.app"
        />
        <ProjectItem
          date="2019 - 2020"
          title="Personal Website"
          href="https://andrii-korin.vercel.app"
          description="Initially started as a project to try out GraphQL. Then I also played with authorization, animation, design, advanced React routing."
        />
        <ProjectItem
          date="2019"
          title="CSS to JSS parser"
          href="https://andrii-korin.vercel.app/css-to-jss"
          description="It was a small utility to help my team with migrating old CSS code. Just paste CSS props and get the ready JSS."
        />
        <ProjectItem
          date="2019"
          title="Emmet JSS extension for VSCode"
          href="https://marketplace.visualstudio.com/items?itemName=carbonid1.emmet-jss"
          description="MaterialUI v3 uses the JSS approach that didn't have a proper VSCode extension to make writing code faster as Emmet does in native CSS. So I wrote a small snippet extension to cover the most used properties and boost the speed of components styling."
        />
      </div>
    </Section>
  )
}

export default PersonalProjects
