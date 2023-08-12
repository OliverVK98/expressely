import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import {
    ArticleList,
    ArticleView,
    useGetArticlesByUserId,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface UserPublishedArticlesProps {
    className?: string;
    id: number;
}

export const UserPublishedArticles = memo(
    (props: UserPublishedArticlesProps) => {
        const { className, id } = props;
        const { t } = useTranslation();
        const { data, error, isLoading } = useGetArticlesByUserId(id);

        return (
            <VStack className={className} max justify="center" gap="16">
                {error && <ErrorCard />}
                <Card max padding="8">
                    <Text
                        align="center"
                        bold
                        text={t(`Popular articles published by this user`)}
                    />
                </Card>
                <ArticleList
                    view={ArticleView.BIG}
                    articles={data}
                    isLoading={isLoading}
                />
            </VStack>
        );
    },
);
