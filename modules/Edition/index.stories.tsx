import type { Story, Meta } from '@storybook/react';
import { Edition, IEditionProps } from '.';
import mocks from 'mocks';

export default { title: 'modules/Edition', component: Edition } as Meta;
const Template: Story<IEditionProps> = args => <Edition {...args} />;

export const Default = Template.bind({});
Default.args = {
  edition: mocks.editions.rangeEng,
} as IEditionProps;
