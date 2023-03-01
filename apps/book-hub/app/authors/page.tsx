import Link from 'next/link'
import prisma from 'lib/prisma'

const getAuthors = () =>
  prisma.author.findMany({
    include: {
      books: true,
    },
  })

const Page = async () => {
  const authors = await getAuthors()

  return (
    <div>
      <table className="table w-full mt-8">
        <thead>
          <tr>
            <th className="w-10"></th>
            <th>Name</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author, index) => (
            <tr key={author.id} className="h-8">
              <th>{index}</th>
              <td>
                <Link key={index} href={`/authors/${author.id}`} className="link link-info">
                  {author.name}
                </Link>
              </td>
              <td>
                {author.books.map(book => (
                  <div key={book.id}>
                    <Link href={`/books/${book.id}`} className="link link-info">
                      {book.title}
                    </Link>
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const metadata = {
  title: 'Authors',
}

export default Page
