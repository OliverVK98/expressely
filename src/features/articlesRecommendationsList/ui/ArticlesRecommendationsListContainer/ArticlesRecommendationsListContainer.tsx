import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleRecommendations } from '../../api/articlesRecommendationsListApi';
import { ArticlesRecommendationsList } from '../articlesRecommendationsList/ArticlesRecommendationsList';

interface ArticlesRecommendationsListPropsContainerProps {
    className?: string;
}

export const ArticlesRecommendationsListContainer = memo(
    (props: ArticlesRecommendationsListPropsContainerProps) => {
        const { className = '' } = props;
        const { data, isLoading } = useArticleRecommendations(5);

        return (
            <ArticlesRecommendationsList
                articles={data}
                isLoading={isLoading}
                className={classNames(className, {}, [className])}
            />
        );
    },
);
