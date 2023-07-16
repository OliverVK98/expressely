import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';
import { UserRole } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'entities/Comment/CommentCard',
    component: CommentCard,
    argTypes: {
        backgroundColor: {
            control: 'color',
        },
    },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
    <CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
    comment: {
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
};

export const Loading = Template.bind({});
Loading.args = {
    comment: {
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
    isLoading: true,
};
