import { memo } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import { useGetUserHistoryArticles } from '../../model/api/mainPageArticles';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface HistoryArticlesProps {
    className?: string;
}

export const HistoryArticles = memo((props: HistoryArticlesProps) => {
    const { className } = props;
    const { data, isLoading, error } = useGetUserHistoryArticles();

    return (
        <>
            {error && <ErrorCard />}
            <ArticleList
                className={className}
                articles={data}
                isLoading={isLoading}
                view={ArticleView.BIG}
            />
        </>
    );
});
