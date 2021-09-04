import type { Story, Meta } from '@storybook/react';
import SignInPage, { SignInPageProps } from '.';

export default { title: 'modules/SignInPage', component: SignInPage } as Meta;
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

export const Apple6Plus = Template.bind({});
Apple6Plus.args = {
  ...Default.args,
};
Apple6Plus.parameters = {
  viewport: { defaultViewport: 'iphone6p' },
};

export const Apple5 = Template.bind({});
Apple5.args = {
  ...Default.args,
};
Apple5.parameters = {
  viewport: { defaultViewport: 'iphone5' },
};
