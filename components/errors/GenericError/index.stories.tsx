import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { GenericError } from '.';

export default {
  title: 'errors/GenericError',
  component: GenericError,
} as Meta;

const Template: Story = args => <GenericError {...args} />;

export const Default = Template.bind({});
