import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './MainPageArticles.module.scss';
import { useArticleRecommendations } from '@/features/articlesRecommendationsList';
import { ArticleList, ArticleView } from '@/entities/Article';

interface MainPageArticlesProps {
    className?: string;
}

export const MainPageArticles = memo((props: MainPageArticlesProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { data, isLoading, error } = useArticleRecommendations(20);

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
