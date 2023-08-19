import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '../../model/consts/consts';
import { ArticleExpandedUser } from '../../model/types/article';
import { ArticleListItem } from '../ArticleListItem/ArticleListItem';
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton';
import cls from './ArticleList.module.scss';
import { HStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';

interface ArticleListBaseProps {
    className?: string;
    articles?: ArticleExpandedUser[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    isPendingArticles?: boolean;
}

interface ArticleListProps extends ArticleListBaseProps {
    isAdmin?: false;
}

interface ArticleAdminListProps extends ArticleListBaseProps {
    isAdmin: true;
    onApproveClick: (id: number) => void;
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 12 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

export const ArticleList = memo(
    (props: ArticleListProps | ArticleAdminListProps) => {
        const {
            className,
            articles,
            view = ArticleView.BIG,
            isLoading,
            target,
            isPendingArticles = false,
            isAdmin = false,
        } = props;
        const { t } = useTranslation();

        const renderArticle = (article: ArticleExpandedUser) => {
            if ('isAdmin' in props && props.isAdmin)
                return (
                    <ArticleListItem
                        article={article}
                        view={view}
                        key={article.id}
                        target={target}
                        isAdmin={isAdmin}
                        onApproveClick={props.onApproveClick}
                        isPendingArticles={isPendingArticles}
                    />
                );
            return (
                <ArticleListItem
                    article={article}
                    view={view}
                    key={article.id}
                    target={target}
                    isPendingArticles={isPendingArticles}
                />
            );
        };

        if (!isLoading && !articles?.length) {
            return (
                <Card
                    max
                    padding="24"
                    className={classNames('', {}, [className, cls[view]])}
                >
                    <Text
                        size="l"
                        align="center"
                        title={t('No articles found')}
                    />
                </Card>
            );
        }

        return (
            <HStack
                wrap="wrap"
                gap="16"
                data-testid="ArticleList"
                className={classNames('', {}, [className, cls[view]])}
                max
            >
                {isLoading && getSkeletons(view)}
                {articles?.length && articles?.length > 0
                    ? articles?.map(renderArticle)
                    : null}
            </HStack>
        );
    },
);
