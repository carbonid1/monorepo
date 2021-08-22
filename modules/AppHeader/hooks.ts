import { useSignInWithGoogleMutation } from 'generated/graphql';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import { removeAuthToken, setAuthToken } from 'services/localStorage.service';

export const useGoogleAuth = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const [signInWithGoogle] = useSignInWithGoogleMutation();

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess: removeAuthToken,
    onFailure: () => alert('Failed to Sign Out'),
  });

  const { signIn } = useGoogleLogin({
    clientId,
    onSuccess: async res => {
      if ('tokenId' in res) {
        try {
          await signInWithGoogle({ variables: { token: res.tokenId } });
          setAuthToken(res.tokenId);
        } catch (err) {
          alert('Failed to Sign In');
        }
      } else {
        alert('You are currently offline');
      }
    },
  });

  return { signIn, signOut };
};
