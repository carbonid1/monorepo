import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { BaseError } from '.';

export default {
  title: 'errors/BaseError',
  component: BaseError,
} as Meta;

const Template: Story = args => <BaseError {...args} />;

export const Default = Template.bind({});
Default.args = {
  status: 'error',
  title: 'Opps...',
};
