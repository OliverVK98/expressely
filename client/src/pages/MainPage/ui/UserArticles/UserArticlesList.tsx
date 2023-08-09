import { useTranslation } from 'react-i18next';
import { ArticleList, ArticleView } from '@/entities/Article';
import { userGetUserArticles } from '../../model/api/mainPageArticles';

interface UserArticlesListProps {
    className?: string;
    fetchApprovedArticles: boolean;
}

export const UserArticlesList = (props: UserArticlesListProps) => {
    const { className, fetchApprovedArticles } = props;
    const { t } = useTranslation();
    const { data, isLoading, error } = userGetUserArticles(
        fetchApprovedArticles,
    );

    return (
        <ArticleList
            articles={data}
            isLoading={isLoading}
            view={ArticleView.BIG}
            className={className}
            isPendingArticles={!fetchApprovedArticles}
        />
    );
};
