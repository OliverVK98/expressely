import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticlesRecommendationsList.module.scss';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';

interface ArticleRecommendationsToolbarSkeletonProps {
    className?: string;
}

export const ArticlesRecommendationsListSkeleton = (
    props: ArticleRecommendationsToolbarSkeletonProps,
) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <VStack max gap="8">
            <Card
                border="default"
                className={classNames(
                    cls.ArticlesRecommendationsListSkeleton,
                    {},
                    [className],
                )}
                max
            >
                <Text text={t('Popular')} size="l" bold align="center" />
            </Card>
            <VStack gap="16" max>
                {new Array(5).fill(0).map((_, index) => (
                    <VStack max gap="4" key={index}>
                        <Skeleton width="100%" height={70} border="round" />
                        <Skeleton width="100%" height={20} border="round" />
                    </VStack>
                ))}
            </VStack>
        </VStack>
    );
};
