import type { Story, Meta } from '@storybook/react';
import { Edition, IEditionProps } from '.';
import mocks from 'mocks';

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
  edition: mocks.editions.rangeEng,
} as IEditionProps;

export const NoPublishedDate = Template.bind({});
NoPublishedDate.args = {
  edition: { ...mocks.editions.rangeEng, publishedIn: undefined },
} as IEditionProps;

export const NoLanguage = Template.bind({});
NoLanguage.args = {
  edition: { ...mocks.editions.rangeEng, lang: undefined },
} as IEditionProps;

export const NoDescription = Template.bind({});
NoDescription.args = {
  edition: { ...mocks.editions.rangeEng, description: undefined },
} as IEditionProps;

export const NoAuthours = Template.bind({});
NoAuthours.args = {
  edition: { ...mocks.editions.rangeEng, book: { ...mocks.editions.rangeEng.book, authors: [] } },
} as IEditionProps;
