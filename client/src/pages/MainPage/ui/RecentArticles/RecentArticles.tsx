import { memo } from 'react';
import { ArticleList, ArticleSortField, ArticleView } from '@/entities/Article';
import { useArticleList } from '@/features/articlesRecommendationsList';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface RecentArticlesProps {
    className?: string;
}

export const RecentArticles = memo((props: RecentArticlesProps) => {
    const { className } = props;
    const { data, isLoading, error } = useArticleList(
        {
            limit: 20,
            order: 'desc',
            sort: ArticleSortField.CREATED,
            expand: 'user',
        },
        {
            pollingInterval: 300000,
        },
    );

    return (
        <>
            {error && <ErrorCard />}
            <ArticleList
                className={className}
                articles={data?.data}
                isLoading={isLoading}
                view={ArticleView.BIG}
            />
        </>
    );
});
