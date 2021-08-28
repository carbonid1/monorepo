import type { Story, Meta } from '@storybook/react';
import usersMock from 'lib/mocks/users';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { AppHeader } from '.';

export default {
  title: 'modules/AppHeader',
  component: AppHeader,
} as Meta;

const Template: Story = args => (
  <NextAuthProvider session={{ user: usersMock.ivan }}>
    <AppHeader {...args} />
  </NextAuthProvider>
);

export const Default = Template.bind({});
