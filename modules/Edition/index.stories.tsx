import type { Story, Meta } from '@storybook/react';
import { Edition, IEditionProps } from '.';
console.log('adfas =======>>>>>>>');
import mocks from 'mocks';

console.log('start =======>>>>>>>');
const edition = mocks.editions.rangeEng;
console.log('edition =======>>>>>>>', edition);

export default {
  title: 'modules/Edition',
  component: Edition,
  decorators: [
    Story => (
      <div className="p-4 max-w-5xl mx-auto">
        <Story />
      </div>
    ),
  ],
} as Meta;
const Template: Story<IEditionProps> = args => <Edition {...args} />;

export const Default = Template.bind({});
Default.args = {
  edition,
} as IEditionProps;

export const NoPublishedDate = Template.bind({});
NoPublishedDate.args = {
  edition: { ...edition, publishedIn: undefined },
} as IEditionProps;

export const NoLanguage = Template.bind({});
NoLanguage.args = {
  edition: { ...edition, lang: undefined },
} as IEditionProps;

export const NoDescription = Template.bind({});
NoDescription.args = {
  edition: { ...edition, description: undefined },
} as IEditionProps;

export const NoAuthours = Template.bind({});
NoAuthours.args = {
  edition: { ...edition, book: { ...edition.book, authors: [] } },
} as IEditionProps;
