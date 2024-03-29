import { notFound } from 'next/navigation'
import prisma from 'lib/prisma'

const getAuthor = async ({ id }) => {
  const author = await prisma.author.findUnique({ where: { id } })

  if (!author) {
    notFound()
  }

  return author
}

const Page = async ({ params }) => {
  const author = await getAuthor({ id: params.id })

  return (
    <div className="prose m-auto">
      <h1>{author.name}</h1>
    </div>
  )
}

export const generateMetadata = async ({ params }) => {
  const author = await getAuthor({ id: params.id })

  return {
    title: author.name,
  }
}

export default Page
