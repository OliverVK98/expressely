import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleCreateHeader } from './ArticleCreateHeader';

export default {
    title: 'shared/ArticleCreateHeader',
    component: ArticleCreateHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCreateHeader>;

const Template: ComponentStory<typeof ArticleCreateHeader> = (args) => (
    <ArticleCreateHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
