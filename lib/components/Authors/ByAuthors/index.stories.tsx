import type { Story, Meta } from '@storybook/react';
import faker from 'faker';
import { ByAuthors, IByAuthors } from '.';

export default { title: 'Authors/ByAuthors', component: ByAuthors } as Meta;
const Template: Story<IByAuthors> = args => <ByAuthors {...args} />;

export const Default = Template.bind({});
Default.args = {
  authors: [
    {
      id: faker.datatype.uuid(),
      fullName: faker.name.findName(),
    },
  ],
};

export const NoAuthors = Template.bind({});
NoAuthors.args = {
  ...Default.args,
  authors: [],
};
