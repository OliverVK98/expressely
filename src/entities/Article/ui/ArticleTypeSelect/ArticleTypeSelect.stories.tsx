import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleTypeSelect } from './ArticleTypeSelect';

export default {
    title: 'shared/ArticleTypeSelect',
    component: ArticleTypeSelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeSelect>;

const Template: ComponentStory<typeof ArticleTypeSelect> = (args) => (
    <ArticleTypeSelect {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
