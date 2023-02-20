import splitbee from '@splitbee/web'

type TData = {
  [key: string]: string | number | boolean
}

export enum ETrackEvents {
  externalLink = 'External Link',
  print = 'Save as PDF',
}

const init = () => splitbee.init()
const track = (e: ETrackEvents, data?: TData) => splitbee.track(e, data)
const trackExternalLink = (ref: string) => track(ETrackEvents.externalLink, { ref })

const trackingService = {
  init,
  track,
  trackExternalLink,
}

export default trackingService
