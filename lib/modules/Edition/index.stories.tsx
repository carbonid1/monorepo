import type { Story, Meta } from '@storybook/react';
import { Edition, IEditionProps } from '.';
import mocks from 'lib/mocks';
import type { Edition as GEdition } from 'lib/generated/graphql';

const edition: GEdition = { ...mocks.editions.rangeEng, book: mocks.books.range };

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
  edition: { ...edition, publishedIn: undefined },
};

export const NoLanguage = Template.bind({});
NoLanguage.args = {
  edition: { ...edition, lang: undefined },
};

export const NoDescription = Template.bind({});
NoDescription.args = {
  edition: { ...edition, description: undefined },
};

export const NoAuthours = Template.bind({});
NoAuthours.args = {
  edition: { ...edition, book: { ...edition.book, authors: [] } },
};
