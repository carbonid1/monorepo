import React from 'react';
import type { Story, Meta } from '@storybook/react';
import LinkBtn, { LinkBtnProps } from '.';

export default {
  title: '@controls/LinkBtn',
  component: LinkBtn,
} as Meta;

const Template: Story<LinkBtnProps> = args => <LinkBtn {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Sign In',
};
