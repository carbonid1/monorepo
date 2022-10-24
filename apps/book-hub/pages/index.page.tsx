import type { NextPage } from 'next'
import { Header } from './components/Header/Header'

const Home: NextPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <div className="prose">
        <h1>Index Page</h1>
      </div>
    </div>
  )
}

export default Home
