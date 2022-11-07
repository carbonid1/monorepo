const Page = () => {
  return <div>dfdf</div>
}

export const getServerSideProps = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // do an API call
    throw new Error('The API is down at the moment')
  } catch (error) {
    // if case 1 do smth
    // if case 2 do smth
    // else rethrow the error so it can be handled by the error page
    throw error
  }
}

export default Page
