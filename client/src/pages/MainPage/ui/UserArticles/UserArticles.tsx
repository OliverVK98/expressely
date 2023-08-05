import { memo } from 'react';
import { ArticleList, ArticleSortField, ArticleView } from '@/entities/Article';
import { useArticleList } from '@/features/articlesRecommendationsList';

interface UserArticlesProps {
    className?: string;
}

export const UserArticles = memo((props: UserArticlesProps) => {
    const { className } = props;
    const { data, isLoading, error } = useArticleList({
        limit: 20,
        order: 'desc',
        sort: ArticleSortField.CREATED,
        expand: 'user',
    });

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
