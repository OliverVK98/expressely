import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleToolbarRecommendations } from '../../api/articleRecommendationsToolbarApi';
import { ArticleRecommendationsToolbar } from '../ArticleRecommendationsToolbar/ArticleRecommendationsToolbar';

interface ArticleRecommendationsToolbarContainerProps {
    className?: string;
}

export const ArticleRecommendationsToolbarContainer = memo(
    (props: ArticleRecommendationsToolbarContainerProps) => {
        const { className = '' } = props;
        const { data, isLoading } = useArticleToolbarRecommendations(5);

        return (
            <ArticleRecommendationsToolbar
                articles={data}
                isLoading={isLoading}
                className={classNames(className, {}, [className])}
            />
        );
    },
);
