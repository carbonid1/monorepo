import { createPage } from './helpers/createPage'
import { fetchTodoList } from './helpers/fetchTodoList'

export const createJournalEntry = async () => {
  const todos = await fetchTodoList()
  return createPage(todos)
}
