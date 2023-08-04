import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPageArticles.module.scss';
import { useArticleRecommendations } from '@/features/articlesRecommendationsList';
import { ArticleList, ArticleSortField, ArticleView } from '@/entities/Article';

interface MainPageArticlesProps {
    className?: string;
}

export const MainPageArticles = memo((props: MainPageArticlesProps) => {
    const { className } = props;
    const { data, isLoading, error } = useArticleRecommendations({
        limit: 20,
        order: 'desc',
        sort: ArticleSortField.CREATED,
        expand: 'user',
    });

    return (
        <div className={classNames(cls.MainPageArticles, {}, [className])}>
            <ArticleList
                articles={data?.data}
                isLoading={isLoading}
                view={ArticleView.BIG}
            />
        </div>
    );
});
