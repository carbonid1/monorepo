/* eslint-disable @next/next/no-img-element */
import AboutMe from '../components/AboutMe'
import Contacts from '../components/Contacts'
import Education from '../components/Education'
import PersonalProjects from '../components/PersonalProjects'
import PetTechs from '../components/PetTechs'
import ProdTechs from '../components/ProdTechs'
import SaveAsPDFBtn from '../components/SavePdf'
import SocialNetworks from '../components/SocialNetworks'
import Title from '../components/Title'
import WorkExperience from '../components/WorkExperience'

const IndexPage = () => (
  <div className="grid grid-cols-12 gap-y-8 justify-items-center">
    <Title />
    <Contacts />
    <SocialNetworks />
    <img
      alt="Andrew"
      src="/avatar.jpg"
      className="self-center col-span-8 col-start-3 rounded sm:col-start-4 sm:col-span-6 md:col-start-1 md:col-span-3"
    />
    <AboutMe />
    <div className="grid col-span-12 justify-self-stretch gap-y-4 md:col-span-8">
      <WorkExperience />
      <PersonalProjects />
    </div>
    <div className="grid grid-cols-12 col-span-12 gap-4 justify-self-stretch md:col-span-3 md:col-start-10 auto-rows-max">
      <ProdTechs />
      <PetTechs />
      <Education />
    </div>
    <SaveAsPDFBtn />
  </div>
)

export default IndexPage
