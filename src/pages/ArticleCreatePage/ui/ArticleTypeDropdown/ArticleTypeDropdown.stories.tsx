import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleTypeDropdown } from './ArticleTypeDropdown';

export default {
    title: 'shared/ArticleTypeDropdown',
    component: ArticleTypeDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeDropdown>;

const Template: ComponentStory<typeof ArticleTypeDropdown> = (args) => (
    <ArticleTypeDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
