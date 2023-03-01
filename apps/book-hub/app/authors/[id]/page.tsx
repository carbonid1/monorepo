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
    <table className="table w-full mt-8">
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr key={author.id}>
          <td>{author.name}</td>
        </tr>
      </tbody>
    </table>
  )
}

export const generateMetadata = async ({ params }) => {
  const author = await getAuthor({ id: params.id })

  return {
    title: author.name,
  }
}

export default Page
