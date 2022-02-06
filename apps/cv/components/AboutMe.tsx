import { FC } from 'react'
import Typography from './Typography'
import Section from './Section'

const AboutMe: FC = () => {
  return (
    <Section
      title="About Me"
      className="col-span-12 md:col-start-5 md:col-span-8 justify-self-stretch"
    >
      <Typography>
        As a graduate of the Faculty of History, I like reading books and watching films with
        historical context. Also, I&apos;ve played strategy games like Civilization or Total War
        series for half of my life, which might have boosted my managing skills. Having 2.5 years
        gap after studying at university, I had finally found that I liked frontend development. It
        perfectly matched with my humanities interests while also gave engineering video-games-like
        challenges.
      </Typography>
      <Typography className="mt-2">
        However, it is never enough for me to do frontend, so I like doing backend stuff, trying to
        do some design for my pet projects, constantly taking more and more responsibilities at work
        (which made me a team lead on the last project). I don&apos;t think I will ever become a
        super good specialist in a single field (I-shaped), but rather a T-shaped that is proficient
        enough in one area and has decent expertise in adjacent ones.
      </Typography>
    </Section>
  )
}

export default AboutMe
