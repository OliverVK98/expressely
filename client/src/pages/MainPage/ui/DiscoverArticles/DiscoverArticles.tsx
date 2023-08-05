import { memo } from 'react';
import { ArticleList, ArticleSortField, ArticleView } from '@/entities/Article';
import { useArticleList } from '@/features/articlesRecommendationsList';
import { User } from '@/entities/User';
import { DiscoverArticleEmpty } from './DiscoverArticleEmpty';

interface DiscoverArticlesProps {
    className?: string;
    authData: User;
}

export const DiscoverArticles = memo((props: DiscoverArticlesProps) => {
    const { className, authData } = props;
    const { data, isLoading, error } = useArticleList({
        limit: 20,
        order: 'desc',
        sort: ArticleSortField.CREATED,
        expand: 'user',
    });

    if (authData?.preferences && authData?.preferences?.length < 1) {
        return <DiscoverArticleEmpty />;
    }

    return (
        <div className={className}>
            <ArticleList
                articles={data?.data}
                isLoading={isLoading}
                view={ArticleView.BIG}
            />
        </div>
    );
});
