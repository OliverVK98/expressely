import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRecommendationsToolbar.module.scss';
import { Text } from '@/shared/ui/Text';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Card } from '@/shared/ui/Card';

interface ArticleRecommendationsToolbarSkeletonProps {
    className?: string;
}

export const ArticleRecommendationsToolbarSkeleton = (
    props: ArticleRecommendationsToolbarSkeletonProps,
) => {
    const { className } = props;
    const { t } = useTranslation();

    return (
        <Card
            border="partial"
            padding="16"
            className={classNames(cls.ArticleRecommendationsToolbar, {}, [
                className,
            ])}
            max
        >
            <Text
                text={t('Most Reading')}
                size="l"
                bold
                align="center"
                className={cls.title}
            />
            <VStack gap="16" align="center">
                {new Array(5).fill(0).map((_, index) => (
                    <VStack max gap="4" key={index}>
                        <Skeleton width="100%" height={70} border="round" />
                        <Skeleton width="100%" height={20} border="round" />
                    </VStack>
                ))}
            </VStack>
        </Card>
    );
};
