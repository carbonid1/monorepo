import React from 'react';
import type { Story, Meta } from '@storybook/react';
import { EditionCover, IEditionCover } from '.';

export default {
  title: 'EditionCover',
  component: EditionCover,
} as Meta;

const Template: Story<IEditionCover> = args => <EditionCover {...args} />;

export const Default = Template.bind({});
Default.args = {
  cover: 'https://res.cloudinary.com/book-hub/image/upload/v1621965132/covers/sm/range_fy4vdv.jpg',
  title: 'Range: Why Generalists Triumph in a Specialized World',
} as IEditionCover;

export const MissingCover = Template.bind({});
MissingCover.args = { ...Default.args, cover: undefined } as IEditionCover;
