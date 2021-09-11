import React from 'react';
import type { Story, Meta } from '@storybook/react';
import TextLink, { TextLinkProps } from '.';

export default {
  title: '@controls/Link',
  component: TextLink,
} as Meta;

const Template: Story<TextLinkProps> = args => <TextLink {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Click Me!',
  path: '#',
};
