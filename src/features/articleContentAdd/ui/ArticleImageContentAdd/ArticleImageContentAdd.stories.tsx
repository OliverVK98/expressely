import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleImageContentAdd } from './ArticleImageContentAdd';

export default {
    title: 'shared/ArticleImageContentAdd',
    component: ArticleImageContentAdd,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleImageContentAdd>;

const Template: ComponentStory<typeof ArticleImageContentAdd> = (args) => (
    <ArticleImageContentAdd {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
