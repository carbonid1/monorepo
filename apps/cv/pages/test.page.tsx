const Page = () => {
  return <div>dfdf</div>
}

export const getServerSideProps = async () => {
  const x = undefined as unknown as { a: string }
  // eslint-disable-next-line no-console
  console.log(x.a)

  return {
    props: {},
  }
}

export default Page
