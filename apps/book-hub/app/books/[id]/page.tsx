import { notFound } from 'next/navigation'
import prisma from 'lib/prisma'

const getBook = async ({ id }) => {
  const book = await prisma.book.findUnique({ where: { id } })

  if (!book) {
    notFound()
  }

  return book
}

const Page = async ({ params }) => {
  const book = await getBook({ id: params.id })

  return (
    <div className="prose m-auto">
      <h1>{book.title}</h1>
    </div>
  )
}

export const generateMetadata = async ({ params }) => {
  const book = await getBook({ id: params.id })

  return {
    title: book.title,
  }
}

export default Page
