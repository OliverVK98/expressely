import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MainPageArticles } from './MainPageArticles';

export default {
    title: 'shared/MainPageArticles',
    component: MainPageArticles,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof MainPageArticles>;

const Template: ComponentStory<typeof MainPageArticles> = (args) => (
    <MainPageArticles {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
