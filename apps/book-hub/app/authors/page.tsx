import Link from 'next/link'
import prisma from 'lib/prisma'

const getAuthors = () => prisma.author.findMany()

const Page = async () => {
  const authors = await getAuthors()

  return (
    <table className="table w-full mt-8">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author, index) => (
          <tr key={author.id}>
            <th>{index}</th>
            <td>
              <Link key={index} href={`/authors/${author.id}`}>
                {author.name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const metadata = {
  title: 'Authors',
}

export default Page
