import { ApolloClient, from, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useMemo } from 'react';
import { getAuthToken } from 'services/localStorage.service';
import { onError } from '@apollo/client/link/error';
import { isSSR } from './utils';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const getURIConfig = () => {
  switch (process.env.NEXT_PUBLIC_VERCEL_ENV) {
    case 'production':
      return { host: 'book-hub.vercel.app', protocol: 'https' };
    case 'preview':
      return { host: process.env.NEXT_PUBLIC_VERCEL_URL, protocol: 'https' };
    case 'development':
    default:
      return { host: 'localhost:3000', protocol: 'http' };
  }
};

function createIsomorphicLink() {
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('@apollo/client/link/schema');
    const { schema } = require('../pages/api');
    return new SchemaLink({ schema });
  } else {
    const { HttpLink } = require('@apollo/client/link/http');
    const { host, protocol } = getURIConfig();
    const uri = `${protocol}://${host}/api`;
    const authToken = getAuthToken();

    return new HttpLink({
      uri,
      credentials: 'same-origin',
      headers: {
        authorization: authToken,
      },
    });
  }
}

const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
      );
    if (networkError) console.error(`[Network error]: ${networkError}`);
  });
};

function createApolloClient() {
  return new ApolloClient({
    ssrMode: isSSR(),
    link: from([createErrorLink(), createIsomorphicLink()]),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (isSSR()) return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState: NormalizedCacheObject | null = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
