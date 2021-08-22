import { gql } from '@apollo/client';

gql`
  mutation signInWithGoogle($token: String!) {
    signInWithGoogle(token: $token) {
      id
    }
  }
`;

gql`
  query me {
    profile {
      picture
    }
  }
`;
