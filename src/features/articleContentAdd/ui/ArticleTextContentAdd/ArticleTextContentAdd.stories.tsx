import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleTextContentAdd } from './ArticleTextContentAdd';

export default {
    title: 'shared/ArticleContentAdd',
    component: ArticleTextContentAdd,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTextContentAdd>;

const Template: ComponentStory<typeof ArticleTextContentAdd> = (args) => (
    <ArticleTextContentAdd {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
