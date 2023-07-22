import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

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
        id: 1,
        text: 'hello world',
        user: {
            id: 1,
            username: 'Test User',
            avatar: null,
        },
        createdAt: 'new Date()',
    },
};

export const Loading = Template.bind({});
Loading.args = {
    comment: {
        id: 1,
        text: 'hello world',
        user: {
            id: 1,
            username: 'Test User',
            avatar: '',
        },
        createdAt: 'new Date()',
    },
    isLoading: true,
};
