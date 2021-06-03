import mocks from 'mocks';
import type { Story, Meta } from '@storybook/react';
import type { IEdition } from 'types/interfaces';
import { Paragraph, IParagraph } from '.';

const edition: IEdition = { ...mocks.editions.LongMars };

export default { title: '@typography/Paragraph', component: Paragraph } as Meta;
const Template: Story<IParagraph> = props => <Paragraph {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: edition.description,
};

export const DefaultEllipsis = Template.bind({});
DefaultEllipsis.args = {
  ...Default.args,
  ellipsis: true,
};

export const ConfiguredEllipsis = Template.bind({});
ConfiguredEllipsis.args = {
  ...Default.args,
  ellipsis: {
    rows: 5,
    expandable: true,
  },
};
