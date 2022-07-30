import { createPage } from './helpers/createPage'
import { getPersonalTodos } from './helpers/getPersonalTodos'
import { getEngTodos } from './helpers/getEngTodos'
import { getHabits } from './helpers/getHabits'
import { getWorkTodos } from './helpers/getWorkTodos'
import { sendEmail } from './helpers/sendEmail'

export const createJournalEntry = async () => {
  const personalTodos = await getPersonalTodos()
  const workTodos = await getWorkTodos()
  const engTodos = await getEngTodos()
  const habits = await getHabits()
  const createPageResponse = await createPage([
    ...habits,
    ...personalTodos,
    ...engTodos,
    ...workTodos,
  ])
  await sendEmail('url' in createPageResponse ? createPageResponse.url : null)

  return createPageResponse
}
