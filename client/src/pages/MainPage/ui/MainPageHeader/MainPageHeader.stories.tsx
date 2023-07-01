import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MainPageHeader } from './MainPageHeader';

export default {
    title: 'shared/MainPageHeader',
    component: MainPageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPageHeader>;

const Template: ComponentStory<typeof MainPageHeader> = (args) => (
    <MainPageHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
