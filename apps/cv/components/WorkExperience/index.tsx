import { FC } from 'react'
import ExternalLinkBtn from '../ExternalLinkBtn'
import Section from '../Section'
import Typography from '../Typography'
import { workExpAchievements } from './consts'

export interface IWorkItem {
  position: string
  description?: string
  date: string
  achievements: string[]
  projectName?: string
  projectLink?: string
  company: string
  techStack: string
}
const WorkItem: FC<IWorkItem> = ({
  date,
  company,
  position,
  techStack,
  description,
  projectLink,
  achievements,
  projectName = 'NDA',
}) => {
  return (
    <div className="grid gap-y-1">
      <Typography type="subtitle" className="font-bold">
        {position}
      </Typography>
      <div>
        <b>Company:</b> {company} ({date})
      </div>
      <div>
        <b>Project:</b>{' '}
        <a href={projectLink} target="_blank" rel="noreferrer">
          {projectName}
        </a>{' '}
        {projectLink && (
          <ExternalLinkBtn
            href={projectLink}
            linkLabel={company}
            className="inline-block align-text-top"
          />
        )}
      </div>
      <div>
        <b>Main Libraries Used:</b> <code className="ml-1 text-red-500">{techStack}</code>
      </div>
      {description && (
        <div>
          <b>Description:</b> {description}
        </div>
      )}
      <b>Achievements:</b>
      <ul>
        {achievements.map((achievement, index) => (
          <li key={index} className="mt-1 list-inside list-disc">
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  )
}

const WorkExperience: FC = () => {
  return (
    <Section title="Work Experience">
      <div className="grid gap-y-4">
        <WorkItem
          company="Surprise.com"
          date="October 2020 - April 2021"
          position="Lead Frontend Engineer"
          projectLink="https://surprise.com"
          achievements={workExpAchievements['surprise-lead']}
          projectName="SDC for Work v3 and its landing page"
          techStack="React.js React-Query Styled-Components Formik React-Beautiful-DnD"
          description="Surprise.com gets people and teams to perform at their best every day by converting quarterly or annual bonuses to a timescale that aligns with today’s highly stimulated, high-expectation workforce."
        />
        <WorkItem
          company="Surprise.com"
          date="May 2020 - October 2020"
          position="Frontend Engineer"
          projectName="SDC for Work v1 and v2"
          achievements={workExpAchievements['suprise-dev']}
          projectLink="https://app.surprise.com"
          techStack="React.js Redux Antd Formik SCSS React-Beautiful-DnD"
        />
        <WorkItem
          company="SoftServe"
          date="October 2018 - May 2020"
          achievements={workExpAchievements.ss}
          techStack="React.js Redux Jest MaterialUI Formik SCSS"
          position="Frontend Engineer"
          description="Trucks/planes/ships tracking application on a map with live events thought WebSockets. Allows companies to manage trade routes and track their cargo to ensure it is in safe conditions."
        />
      </div>
    </Section>
  )
}

export default WorkExperience
