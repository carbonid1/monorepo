import { isSSR } from 'lib/utils';

enum ELocalStorageItems {
  authToken = 'authToken',
}

export const getAuthToken = () => {
  if (!isSSR()) {
    return localStorage.getItem(ELocalStorageItems.authToken);
  }
};

export const setAuthToken = (token: string) => {
  return localStorage.setItem(ELocalStorageItems.authToken, token);
};

export const removeAuthToken = () => {
  return localStorage.removeItem(ELocalStorageItems.authToken);
};
