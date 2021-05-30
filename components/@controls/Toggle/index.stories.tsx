import type { Story, Meta } from '@storybook/react';
import { useState } from 'react';
import { Toggle, IToggle } from '.';

export default { title: '@controls/Toggle', component: Toggle } as Meta;
const Template: Story<IToggle> = props => {
  const [isChecked, onChange] = useState(props.isChecked);
  return <Toggle {...props} isChecked={isChecked} onChange={onChange} />;
};

export const Default = Template.bind({});
Default.args = { isChecked: true, srLabel: 'Show All' };

export const WithLabel = Template.bind({});
WithLabel.args = { ...Default.args, label: 'Show All' };

// export const WithLabelAndDescription = Template.bind({});
// WithLabelAndDescription.args = { ...WithLabel.args, description: 'Shows all settings' };
