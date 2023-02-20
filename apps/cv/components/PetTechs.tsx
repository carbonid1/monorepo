import { FC } from 'react'
import Section from './Section'

const techs: string[] = [
  'PWA',
  'Figma',
  'Vercel',
  'Mapbox',
  'Node.js',
  'MongoDB',
  'PostgreSQL',
  'Express.js',
  'WebSockets',
  'Ruby on Rails',
  'React-Beautiful-DnD',
  'Apollo Client/Server',
]

const PetTechs: FC = () => {
  return (
    <Section
      className="col-span-12 sm:col-span-6 md:col-span-12"
      title="Technologies I have some experience working with"
    >
      {techs.map((tech, index) => (
        <code className="block" key={index}>
          {tech}
        </code>
      ))}
    </Section>
  )
}

export default PetTechs
