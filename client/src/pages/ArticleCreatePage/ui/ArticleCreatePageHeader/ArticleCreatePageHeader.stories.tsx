import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleCreatePageHeader } from './ArticleCreatePageHeader';

export default {
    title: 'shared/ArticleCreatePageHeader',
    component: ArticleCreatePageHeader,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleCreatePageHeader>;

const Template: ComponentStory<typeof ArticleCreatePageHeader> = (args) => (
    <ArticleCreatePageHeader {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
