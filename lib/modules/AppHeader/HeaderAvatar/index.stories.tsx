import type { Story, Meta } from '@storybook/react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { graphql } from 'msw';
import usersMock from 'lib/mocks/users.mock';
import gg from 'lib/generated';
import { HeaderAvatar } from '.';

export default {
  title: 'modules/AppHeader/HeaderAvatar',
  component: HeaderAvatar,
} as Meta;

const mockedClient = new ApolloClient({
  uri: 'https://mocked/api',
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

const Template: Story = args => (
  <ApolloProvider client={mockedClient}>
    <HeaderAvatar {...args} />
  </ApolloProvider>
);

export const Default = Template.bind({});
Default.parameters = {
  msw: [
    graphql.query(gg.names.Query.ProfileHook, (_, res, ctx) => {
      return res(ctx.data({ profile: usersMock.ivan }));
    }),
  ],
};

export const NoProfileImage = Template.bind({});
NoProfileImage.parameters = {
  msw: [
    graphql.query(gg.names.Query.ProfileHook, (_, res, ctx) => {
      return res(ctx.data({ profile: usersMock.john }));
    }),
  ],
};
