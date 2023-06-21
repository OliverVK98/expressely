import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleShortList } from './ArticleShortList';

export default {
    title: 'shared/ArticleShortList',
    component: ArticleShortList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleShortList>;

const Template: ComponentStory<typeof ArticleShortList> = (args) => (
    <ArticleShortList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
