import type { NextPage } from 'next'
import { Header } from './components/Header/Header'

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="prose">
        <h1>Index Page</h1>
      </div>
    </>
  )
}

export default Home
