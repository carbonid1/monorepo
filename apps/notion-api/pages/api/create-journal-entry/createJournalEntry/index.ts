import { createPage } from './helpers/createPage'
import { fetchTodoList } from './helpers/fetchTodoList'
import { getWorkTodos } from './helpers/getWorkTodos'

export const createJournalEntry = async () => {
  const todos = await fetchTodoList()
  const workTodos = getWorkTodos()
  return createPage(todos, workTodos)
}
