import type { NextPage } from 'next'
import { Header } from './components/Header/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <h1 className="text-3xl font-bold underline text-red-500">Author page</h1>
    </>
  )
}

export default Home
