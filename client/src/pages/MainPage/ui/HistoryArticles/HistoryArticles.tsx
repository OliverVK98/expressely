import { memo } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import { useGetUserHistoryArticles } from '../../model/api/userHistoryArticles';

interface HistoryArticlesProps {
    className?: string;
}

export const HistoryArticles = memo((props: HistoryArticlesProps) => {
    const { className } = props;
    const { data, isLoading, error } = useGetUserHistoryArticles();

    // TODO: isLoading not working?
    return (
        <ArticleList
            className={className}
            articles={data}
            isLoading={isLoading}
            view={ArticleView.BIG}
        />
    );
});
