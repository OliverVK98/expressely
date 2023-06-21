import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRecommendationsToolbar.module.scss';
import { Text } from '@/shared/ui/Text';
import { Article, ArticleShortList } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { ArticleRecommendationsToolbarSkeleton } from './ArticleRecommendationsToolbarSkeleton';

interface ArticleRecommendationsToolbarProps {
    className?: string;
    articles?: Article[];
    isLoading?: boolean;
}

export const ArticleRecommendationsToolbar = memo(
    (props: ArticleRecommendationsToolbarProps) => {
        const { className, articles, isLoading } = props;
        const { t } = useTranslation();

        if (isLoading) {
            return <ArticleRecommendationsToolbarSkeleton />;
        }

        return (
            <Card
                border="partial"
                padding="16"
                className={classNames(cls.ArticleRecommendationsToolbar, {}, [
                    className,
                ])}
            >
                <Text
                    text={t('Most Reading')}
                    size="l"
                    bold
                    align="center"
                    className={cls.title}
                />
                <VStack gap="4" max>
                    {articles?.map((article) => (
                        <ArticleShortList
                            key={article.id}
                            article={article}
                            target="_blank"
                        />
                    ))}
                </VStack>
            </Card>
        );
    },
);
