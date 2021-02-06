import { withApollo } from '../apollo/client';

const Home = () => {
  return <h1>Welcome to BookHub</h1>;
};

export default withApollo(Home);
