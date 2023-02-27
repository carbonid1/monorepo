import prisma from 'lib/prisma'

type FetchAuthors = () => Promise<ReturnType<typeof prisma.author.findMany>>

const fetchAuthors: FetchAuthors = async () => {
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/authors`)
  const { authors } = await res.json()
  return authors
}

const Page = async () => {
  const authors = await fetchAuthors()

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
            <td>{author.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Page
