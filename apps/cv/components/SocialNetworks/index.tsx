import { FC } from 'react'
import cn from 'classnames'
import Typography from '../Typography'
import trackingService from '../../services/tracking.service'

interface INetwork {
  nickname: string
  link: string
  className?: string
  children: React.ReactNode
}
const Network: FC<INetwork> = ({ children, nickname, link, className }) => (
  <a
    onClick={() => trackingService.trackExternalLink(link)}
    href={link}
    target="_blank"
    className={cn(
      'grid justify-items-center gap-8 grid-cols-[40px,88px] md:col-span-2 md:gap-2 md:f md:py-4 items-center justify-self-center',
      className,
    )}
    rel="noreferrer"
  >
    <div className="justify-self-end rounded-full border-gray-900 border-2 w-10 h-10 flex items-center justify-center">
      {children}
    </div>
    <Typography className="whitespace-nowrap justify-self-start">{nickname}</Typography>
  </a>
)

const SocialNetworks: FC = () => {
  return (
    <div
      className="
        social-networks
        col-span-12 justify-self-stretch gap-y-2
        md:gap-y-0 md:gap-x-4 md:my-4 py-4 md:py-0 md:px-4
        grid md:grid-cols-10
        border-t-2 border-b-2 border-gray-900
      "
    >
      <Network nickname="@carbonid1" link="https://www.facebook.com/carbonid1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
        </svg>
      </Network>
      <Network nickname="@carbonid1" link="https://www.instagram.com/carbonid1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </Network>
      <Network nickname="Andrii Korin" link="https://www.linkedin.com/in/andrii-korin-92b54a153/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
        </svg>
      </Network>
      <Network
        nickname="Andrii Korin"
        link="https://www.goodreads.com/user/show/68108739-andrii-korin"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="24px" height="24px">
          <path d="M 25 2 C 20.459 2 16.58664 3.9082151 13.982422 6.9453125 C 11.378203 9.9824099 10 14.07975 10 18.5 C 10 22.92025 11.378203 27.017589 13.982422 30.054688 C 16.58664 33.091785 20.459 35 25 35 C 29.531588 35 33.395936 33.098395 36 30.072266 L 36 35 C 36 37.598543 35.181497 39.764071 33.548828 41.339844 C 31.91616 42.915616 29.363725 44 25.5 44 C 17.784314 44 15 39.933333 15 36 L 11 36 C 11 42.066667 16.215686 48 25.5 48 C 30.136275 48 33.83384 46.622274 36.326172 44.216797 C 38.818503 41.811319 40 38.476457 40 35 L 40 18.5 L 40 3 L 36 3 L 36 6.9277344 C 33.395936 3.9016049 29.531588 2 25 2 z M 25 6 C 28.459 6 31.08664 7.3379255 32.982422 9.5488281 C 34.878203 11.759731 36 14.91225 36 18.5 C 36 22.08775 34.878203 25.240269 32.982422 27.451172 C 31.08664 29.662074 28.459 31 25 31 C 21.541 31 18.91336 29.662074 17.017578 27.451172 C 15.121797 25.240269 14 22.08775 14 18.5 C 14 14.91225 15.121797 11.759731 17.017578 9.5488281 C 18.91336 7.3379255 21.541 6 25 6 z" />
        </svg>
      </Network>
      <Network nickname="@carbonid1" link="https://github.com/carbonid1">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </Network>
    </div>
  )
}

export default SocialNetworks
