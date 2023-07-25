import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import SignUpForm from './SignUpForm';

export default {
    title: 'shared/SignUpForm',
    component: SignUpForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SignUpForm>;

const Template: ComponentStory<typeof SignUpForm> = (args) => (
    <SignUpForm {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
