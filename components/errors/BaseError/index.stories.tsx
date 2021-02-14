import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { BaseError, IBaseError } from '.';

export default {
  title: 'errors/BaseError',
  component: BaseError,
} as Meta;

const Template: Story<IBaseError> = args => <BaseError {...args} />;
export const Default = Template.bind({});
