import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleBlocksRenderer } from './ArticleBlocksRenderer';

export default {
    title: 'shared/ArticleBlocksRender',
    component: ArticleBlocksRenderer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleBlocksRenderer>;

const Template: ComponentStory<typeof ArticleBlocksRenderer> = (args) => (
    <ArticleBlocksRenderer {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
