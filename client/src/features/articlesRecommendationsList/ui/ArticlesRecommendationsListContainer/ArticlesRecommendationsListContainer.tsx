import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleRecommendations } from '../../api/articlesRecommendationsListApi';
import { ArticlesRecommendationsList } from '../articlesRecommendationsList/ArticlesRecommendationsList';
import { ArticleSortField } from '@/entities/Article';

interface ArticlesRecommendationsListPropsContainerProps {
    className?: string;
}

export const ArticlesRecommendationsListContainer = memo(
    (props: ArticlesRecommendationsListPropsContainerProps) => {
        const { className = '' } = props;
        const { data, isLoading } = useArticleRecommendations({
            limit: 5,
            order: 'desc',
            sort: ArticleSortField.VIEWS,
            expand: 'user',
        });

        return (
            <ArticlesRecommendationsList
                articles={data?.data}
                isLoading={isLoading}
                className={classNames(className, {}, [className])}
            />
        );
    },
);
