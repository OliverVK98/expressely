import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleCodeContentAdd } from './ArticleCodeContentAdd';

export default {
    title: 'shared/ArticleCodeContentAdd',
    component: ArticleCodeContentAdd,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCodeContentAdd>;

const Template: ComponentStory<typeof ArticleCodeContentAdd> = (args) => (
    <ArticleCodeContentAdd {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
