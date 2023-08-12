import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useArticleList } from '../../api/articlesListApi';
import { ArticlesRecommendationsList } from '../articlesRecommendationsList/ArticlesRecommendationsList';
import { ArticleSortField } from '@/entities/Article';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface ArticlesRecommendationsListPropsContainerProps {
    className?: string;
}

export const ArticlesRecommendationsListContainer = memo(
    (props: ArticlesRecommendationsListPropsContainerProps) => {
        const { className = '' } = props;
        const { data, isLoading, error } = useArticleList({
            limit: 5,
            order: 'desc',
            sort: ArticleSortField.VIEWS,
            expand: 'user',
        });

        if (error) return <ErrorCard />;

        return (
            <ArticlesRecommendationsList
                articles={data?.data}
                isLoading={isLoading}
                className={classNames(className, {}, [className])}
            />
        );
    },
);
