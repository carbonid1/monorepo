import type { Story, Meta } from '@storybook/react';
import { LoadingContent, ILoadingContent } from '.';

export default { title: '@layout/LoadingContent', component: LoadingContent } as Meta;
const Template: Story<ILoadingContent> = props => (
  <LoadingContent {...props}>
    <ol>
      <li>Milk</li>
      <li>Potatos</li>
      <li>Glue</li>
    </ol>
  </LoadingContent>
);

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  empty: false,
};

export const Empty = Template.bind({});
Empty.args = {
  ...Loading.args,
  loading: false,
  empty: true,
  title: 'We are sorry :(',
  subTitle: 'There are no reviews yet. But you may submit the first one!',
};

export const Default = Template.bind({});
Default.args = {
  ...Loading.args,
  loading: false,
};
