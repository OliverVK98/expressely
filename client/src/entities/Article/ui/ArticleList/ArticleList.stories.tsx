import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleView } from '../../model/consts/consts';
import { ArticleList } from './ArticleList';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
    <ArticleList {...args} />
);

export const LoadingBig = Template.bind({});
LoadingBig.args = {
    articles: [],
    isLoading: true,
    view: ArticleView.BIG,
};

export const LoadingSmall = Template.bind({});
LoadingSmall.args = {
    articles: [],
    isLoading: true,
    view: ArticleView.SMALL,
};

export const ListSmall = Template.bind({});
ListSmall.args = {
    articles: [],
    isLoading: false,
    view: ArticleView.SMALL,
};

export const ListBig = Template.bind({});
ListBig.args = {
    articles: [],
    isLoading: false,
    view: ArticleView.BIG,
};
