import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { ILink, Link } from '.';

export default {
  title: '@controls/Link',
  component: Link,
} as Meta;

const Template: Story<ILink> = args => <Link {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'Click Me!', path: '#' };
