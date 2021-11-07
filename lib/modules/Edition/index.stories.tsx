import type { Story, Meta } from '@storybook/react';
import startCase from 'lodash/startCase';
import faker from 'faker';
import type gg from 'lib/generated';
import { Edition, IEditionProps } from '.';

faker.seed(1);

const edition: gg.Edition = {
  lang: 'en',
  reviews: [],
  id: faker.datatype.uuid(),
  title: startCase(faker.lorem.words()),
  cover: faker.image.business(160, 240),
  description: faker.lorem.paragraphs(5),
  publishedIn: faker.date.past().getTime().toString(),
  book: {
    authors: [],
    editions: [],
    id: faker.datatype.uuid(),
    publishedIn: faker.date.past().getTime().toString(),
  },
};

export default {
  title: 'modules/Edition',
  component: Edition,
  decorators: [
    Story => (
      <div className="max-w-5xl p-4">
        <Story />
      </div>
    ),
  ],
} as Meta;
const Template: Story<IEditionProps> = args => <Edition {...args} />;

export const Default = Template.bind({});
Default.args = {
  edition,
};

export const NoPublishedDate = Template.bind({});
NoPublishedDate.args = {
  edition: { ...edition, publishedIn: null },
};

export const NoLanguage = Template.bind({});
NoLanguage.args = {
  edition: { ...edition, lang: null },
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  edition: { ...edition, description: null },
};

export const NoAuthours = Template.bind({});
NoAuthours.args = {
  edition: { ...edition, book: { ...edition.book, authors: [] } },
};
