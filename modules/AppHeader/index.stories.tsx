import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { AppHeader } from '.';

export default {
  title: 'modules/App Header',
  component: AppHeader,
} as Meta;

const Template: Story = args => <AppHeader {...args} />;

export const Default = Template.bind({});
