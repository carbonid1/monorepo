import { createPage } from './helpers/createPage'
import { fetchTodoList } from './helpers/fetchTodoList'

export const createJournalEntry = async () => {
  const toDos = await fetchTodoList()
  await createPage(toDos)
}
