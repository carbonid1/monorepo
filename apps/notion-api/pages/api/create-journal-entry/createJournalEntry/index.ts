import { createPage } from './helpers/createPage'
import { fetchTodoList } from './helpers/fetchTodoList'
import { getEngTodos } from './helpers/getEngTodos'
import { getWorkTodos } from './helpers/getWorkTodos'

export const createJournalEntry = async () => {
  const todos = await fetchTodoList()
  const workTodos = getWorkTodos()
  const engTodos = await getEngTodos()

  return createPage(todos, [...engTodos, ...workTodos])
}
