import prisma from 'lib/prisma'

type FetchAuthors = () => Promise<ReturnType<typeof prisma.author.findMany>>

const getAuthors: FetchAuthors = async () => {
  return await prisma.author.findMany()
}

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
            <td>{author.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Page
