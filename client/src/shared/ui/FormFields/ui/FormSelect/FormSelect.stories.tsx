import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormSelect } from './FormSelect';

export default {
    title: 'shared/FormSelect',
    component: FormSelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FormSelect>;

const Template: ComponentStory<typeof FormSelect> = (args) => (
    <FormSelect {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
