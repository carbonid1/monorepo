import React from 'react';
import type { Story, Meta } from '@storybook/react';
import faker from 'faker';
import { Authors, IAuthors } from '.';

faker.seed(1);

export default {
  title: 'Authors',
  component: Authors,
} as Meta;

const Template: Story<IAuthors> = args => <Authors {...args} />;

export const Default = Template.bind({});
Default.args = {
  authors: [
    {
      id: faker.datatype.uuid(),
      fullName: faker.name.findName(),
    },
    {
      id: faker.datatype.uuid(),
      fullName: faker.name.findName(),
    },
  ],
};

export const ColumnSuffix = Template.bind({});
ColumnSuffix.args = {
  ...Default.args,
  lastAuthorSuffix: ':',
};
