import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ArticleRecommendationsToolbar } from './ArticleRecommendationsToolbar';

export default {
    title: 'shared/ArticleRecommendationsToolbar',
    component: ArticleRecommendationsToolbar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleRecommendationsToolbar>;

const Template: ComponentStory<typeof ArticleRecommendationsToolbar> = (
    args,
) => <ArticleRecommendationsToolbar {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
