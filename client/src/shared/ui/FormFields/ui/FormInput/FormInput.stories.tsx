import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormInput } from './FormInput';

export default {
    title: 'shared/FormInput',
    component: FormInput,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof FormInput>;

const Template: ComponentStory<typeof FormInput> = (args) => (
    <FormInput {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
