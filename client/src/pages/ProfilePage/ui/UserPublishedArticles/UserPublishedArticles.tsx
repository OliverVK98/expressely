import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './UserPublishedArticles.module.scss';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import {
    ArticleList,
    ArticleView,
    useGetArticlesByUserId,
} from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { Profile } from '@/entities/Profile';

interface UserPublishedArticlesProps {
    className?: string;
    id: number;
    authData?: Profile;
}

export const UserPublishedArticles = memo(
    (props: UserPublishedArticlesProps) => {
        const { className, id, authData } = props;
        const { t } = useTranslation();
        const { data, error, isLoading } = useGetArticlesByUserId(id);

        return (
            <VStack
                className={classNames(cls.UserPublishedArticles, {}, [
                    className,
                ])}
                max
                justify="center"
                gap="16"
            >
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
