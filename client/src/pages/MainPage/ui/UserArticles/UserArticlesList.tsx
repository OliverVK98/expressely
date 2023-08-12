import { ArticleList, ArticleView } from '@/entities/Article';
import { userGetUserArticles } from '../../model/api/mainPageArticles';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface UserArticlesListProps {
    className?: string;
    fetchApprovedArticles: boolean;
}

export const UserArticlesList = (props: UserArticlesListProps) => {
    const { className, fetchApprovedArticles } = props;
    const { data, isLoading, error } = userGetUserArticles(
        fetchApprovedArticles,
    );

    return (
        <>
            {error && <ErrorCard />}
            <ArticleList
                articles={data}
                isLoading={isLoading}
                view={ArticleView.BIG}
                className={className}
                isPendingArticles={!fetchApprovedArticles}
            />
        </>
    );
};
