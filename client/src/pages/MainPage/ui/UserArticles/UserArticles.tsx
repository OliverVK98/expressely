import { memo } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import { userGetUserArticles } from '../../model/api/mainPageArticles';

interface UserArticlesProps {
    className?: string;
}

export const UserArticles = memo((props: UserArticlesProps) => {
    const { className } = props;
    const { data, isLoading, error } = userGetUserArticles();

    return (
        <div className={className}>
            <ArticleList
                articles={data}
                isLoading={isLoading}
                view={ArticleView.BIG}
            />
        </div>
    );
});
