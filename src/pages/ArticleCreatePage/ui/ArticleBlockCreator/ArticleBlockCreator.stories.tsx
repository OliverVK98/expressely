import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleBlockCreator } from './ArticleBlockCreator';

export default {
    title: 'shared/ArticleBlockCreator',
    component: ArticleBlockCreator,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleBlockCreator>;

const Template: ComponentStory<typeof ArticleBlockCreator> = (args) => (
    <ArticleBlockCreator {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
