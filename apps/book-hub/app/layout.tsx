import '../styles/global.css'
import { Header } from './components/Header/Header'

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="max-w-7xl mx-auto">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}

export default Layout
