import { FC, useEffect } from 'react'
import { AppProps } from 'next/app'
import '../styles/global.css'
import Head from 'next/head'
import trackingService from '../services/tracking.service'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    trackingService.init()
  }, [])

  return (
    <>
      <Head>
        <title>Andrii Korin CV</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <div className="max-w-screen-lg p-4 mx-auto md:p-8 print:p-0">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default App
