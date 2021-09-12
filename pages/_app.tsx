import 'styles/globals.css';
import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import type { NextPage } from 'next';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { ThemeProvider } from 'styled-components';
import { AppHeader } from 'lib/modules/AppHeader';
import { useApollo } from 'lib/apollo';
import trackingService from 'lib/services/tracking';
import AppWrapper from 'lib/components/AppWrapper';
import GlobalStyles from 'styles/GlobalStyles';
import theme from 'styles/theme';

const MyApp: NextPage<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    trackingService.init();
  }, []);

  return (
    <NextAuthProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <title key="title">BookHub</title>
          <meta name="description" content="Your most beautiful bookshelf" />
          <meta name="keywords" content="books bookshelf review quotes" />
          <link rel="manifest" href="/manifest.json" />
          <link href="/icons/favicon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
          <link href="/icons/favicon-32x32.png" rel="icon" type="image/png" sizes="32x32" />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <AppHeader />
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </ThemeProvider>
      </ApolloProvider>
    </NextAuthProvider>
  );
};

export default MyApp;
