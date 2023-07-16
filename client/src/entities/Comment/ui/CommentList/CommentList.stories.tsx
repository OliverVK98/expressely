import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CommentList } from './CommentList';
import { UserRole } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/Comment/CommentList',
    component: CommentList,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
    <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comments: [
        {
            id: '1',
            text: 'hello world',
            user: {
                id: 1,
                username: 'Test User',
                avatar: '',
                roles: [UserRole.USER],
                features: {
                    isAppRedesigned: true,
                    isArticleRatingEnabled: true,
                },
                jsonSettings: {
                    isArticlesPageWasOpened: true,
                    theme: Theme.LIGHT,
                },
            },
        },
        {
            id: '2',
            text: 'hello world',
            user: {
                id: 1,
                username: 'Test User',
                avatar: '',
                roles: [UserRole.USER],
                features: {
                    isAppRedesigned: true,
                    isArticleRatingEnabled: true,
                },
                jsonSettings: {
                    isArticlesPageWasOpened: true,
                    theme: Theme.LIGHT,
                },
            },
        },
    ],
};

export const Loading = Template.bind({});
Loading.args = {
    comments: [],
    isLoading: true,
};
