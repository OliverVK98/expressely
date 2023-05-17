import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from 'shared/ui/Text';
import { TextSize } from 'shared/ui/Text/ui/Text';
import { ArticleList } from 'entities/Article/ui/ArticleList/ArticleList';
import { VStack } from 'shared/ui/Stack';
import { useArticleRecommendationsList } from 'features/articleRecommendationsList/api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
    className?: string;
}

export const ArticleRecommendationsList = memo(
    (props: ArticleRecommendationsListProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const {
            data: articles,
            isLoading,
            error,
        } = useArticleRecommendationsList(3);

        if (isLoading || error || !articles) {
            return null;
        }

        return (
            <VStack gap="8" className={classNames('', {}, [className])}>
                <Text size={TextSize.L} title={t('Recommended')} />
                <ArticleList articles={articles} target="_blank" />
            </VStack>
        );
    },
);
