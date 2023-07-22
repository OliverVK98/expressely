import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Form } from './Form';

export default {
    title: 'shared/Form',
    component: Form,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
