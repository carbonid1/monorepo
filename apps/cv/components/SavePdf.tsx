import { FC } from 'react'
import trackingService, { ETrackEvents } from '../services/tracking.service'

const SaveAsPDFBtn: FC = () => {
  return (
    <button
      title="Print"
      className="hidden print:hidden lg:block fixed right-8 bottom-8 text-blue-400 rounded-full border-gray-900 border-2 p-6 focus:ring-2 focus:outline-none ring-blue-400 z-10"
      onClick={() => {
        window?.print()
        trackingService.track(ETrackEvents.print)
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  )
}

export default SaveAsPDFBtn
