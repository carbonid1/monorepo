import type { Story, Meta } from '@storybook/react';
import SignInPage, { SignInPageProps } from '.';

export default {
  title: 'modules/SignInPage',
  component: SignInPage,
  parameters: {
    chromatic: { viewports: [320, 414, 1200] },
  },
} as Meta;
const Template: Story<SignInPageProps> = props => <SignInPage {...props} />;

export const Default = Template.bind({});
Default.args = {
  providers: {
    facebook: {
      id: 'FB',
      callbackUrl: '',
      name: '',
      signinUrl: '',
      type: 'oauth',
    },
    google: {
      id: 'Google',
      callbackUrl: '',
      name: '',
      signinUrl: '',
      type: 'oauth',
    },
    github: {
      id: 'GitHub',
      callbackUrl: '',
      name: '',
      signinUrl: '',
      type: 'oauth',
    },
    twitter: {
      id: 'Twitter',
      callbackUrl: '',
      name: '',
      signinUrl: '',
      type: 'oauth',
    },
  },
};
