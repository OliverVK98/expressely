import { memo } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import { User } from '@/entities/User';
import { DiscoverArticleEmpty } from './DiscoverArticleEmpty';
import { useGetUserCustomFeedArticles } from '../../model/api/mainPageArticles';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface DiscoverArticlesProps {
    className?: string;
    authData: User;
}

export const DiscoverArticles = memo((props: DiscoverArticlesProps) => {
    const { className, authData } = props;
    const { data, isLoading, error } = useGetUserCustomFeedArticles();

    if (authData?.preferences && authData?.preferences?.length < 1) {
        return <DiscoverArticleEmpty />;
    }

    return (
        <>
            {error && <ErrorCard />}
            <ArticleList
                articles={data}
                isLoading={isLoading}
                view={ArticleView.BIG}
                className={className}
            />
        </>
    );
});
