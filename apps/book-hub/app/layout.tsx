import '../styles/global.css'
import { Header } from './components/Header/Header'

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body className="flex min-h-screen">
        <div className="max-w-7xl mx-auto flex-1 grid grid-rows-[min-content,1fr]">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'BookHub',
}

export default Layout
