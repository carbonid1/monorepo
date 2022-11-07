function Error({ statusCode, errorMessage }) {
  return (
    <p style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p>
        {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
      </p>
      <p>{errorMessage ?? false}</p>
    </p>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode, errorMessage: err.message }
}

export default Error
