import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesRecommendationsList.module.scss';
import { Text } from '@/shared/ui/Text';
import { ArticleExpandedUser, ArticleShortList } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { ArticlesRecommendationsListSkeleton } from './ArticlesRecommendationsListSkeleton';

interface ArticlesRecommendationsListProps {
    className?: string;
    articles?: ArticleExpandedUser[];
    isLoading?: boolean;
}

export const ArticlesRecommendationsList = memo(
    (props: ArticlesRecommendationsListProps) => {
        const { className, articles, isLoading } = props;
        const { t } = useTranslation();

        if (isLoading) {
            return <ArticlesRecommendationsListSkeleton />;
        }

        return (
            <VStack max gap="8">
                <Card
                    border="default"
                    max
                    className={classNames(
                        cls.ArticleRecommendationsToolbar,
                        {},
                        [className],
                    )}
                >
                    <Text
                        text={t('Most Reading')}
                        size="l"
                        bold
                        align="center"
                    />
                </Card>
                {articles?.map((article) => (
                    <ArticleShortList
                        key={article.id}
                        article={article}
                        target="_blank"
                    />
                ))}
            </VStack>
        );
    },
);
