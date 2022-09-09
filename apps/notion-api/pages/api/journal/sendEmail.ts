import sgMail from '@sendgrid/mail'
import { format } from 'date-fns'

const { SEND_EMAIL_FROM, SEND_EMAIL_TO, SEND_GRID_API_KEY } = process.env

sgMail.setApiKey(SEND_GRID_API_KEY)

export const sendEmail = async (entryURL: string | null) => {
  if (entryURL === null) {
    return new Error('Journal entry URL is null')
  }

  return sgMail.send({
    from: SEND_EMAIL_FROM,
    to: SEND_EMAIL_TO,
    templateId: 'd-f1c1d77ab5064f26ae468157a5562be7',
    dynamicTemplateData: {
      entryURL,
      date: format(new Date(), 'EEEE, MMM dd'),
    },
  })
}
