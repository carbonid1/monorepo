import { ApolloError } from 'apollo-server-micro';
import { LoginTicket, OAuth2Client, VerifyIdTokenOptions } from 'google-auth-library';

const authGoogleClient = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export const verifyGoogleIdToken = async (idToken: VerifyIdTokenOptions['idToken']): Promise<LoginTicket> => {
  try {
    const loginTiket = await authGoogleClient.verifyIdToken({
      idToken,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    return loginTiket;
  } catch (err) {
    throw new ApolloError('Authentication token is invalid');
  }
};
