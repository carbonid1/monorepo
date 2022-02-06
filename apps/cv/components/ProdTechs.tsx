import { FC } from 'react'
import Section from './Section'

const techs: string[] = [
  'TypeScript',
  'React.js',
  'Redux',
  'React-Query',
  'Next.js',
  'GraphQL',
  'HTML',
  'CSS',
  'SCCS',
  'TailwindCSS',
  'Styled-Components',
  'Antd',
  'MaterialUI',
  'Git',
  'VSCode',
  'Sentry.io',
  'Jest',
  'Storybook',
]

const ProdTechs: FC = () => {
  return (
    <Section
      className="col-span-12 sm:col-span-6 md:col-span-12"
      title="Technologies I confidently work with"
    >
      {techs.map((tech, index) => (
        <code className="block" key={index}>
          {tech}
        </code>
      ))}
    </Section>
  )
}

export default ProdTechs
