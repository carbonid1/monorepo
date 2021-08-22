import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getAuthToken } from 'services/localStorage.service';
import { isSSR } from 'lib/utils';

let apolloClient = null;

export function withApollo(PageComponent, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }) => {
    const client = apolloClient || initApolloClient(apolloState);
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  if (process.env.NODE_ENV !== 'production') {
    const displayName = PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      const apolloClient = (ctx.apolloClient = initApolloClient());

      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      if (isSSR()) {
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />,
            );
          } catch (error) {
            console.error('Error while running `getDataFromTree`', error);
          }
        }
      }

      const apolloState = apolloClient.cache.extract();
      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}

function initApolloClient(initialState) {
  if (isSSR()) return createApolloClient(initialState);
  if (!apolloClient) apolloClient = createApolloClient(initialState);
  return apolloClient;
}

function createApolloClient(initialState = {}) {
  const cache = new InMemoryCache().restore(initialState);

  return new ApolloClient({
    cache,
    ssrMode: isSSR(),
    link: createIsomorphLink(),
  });
}

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

function createIsomorphLink() {
  const { HttpLink } = require('apollo-link-http');
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
