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

interface ArticleListProps {
    className?: string;
    articles?: ArticleExpandedUser[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    isAdmin?: false;
}

interface ArticleAdminListProps {
    className?: string;
    articles?: ArticleExpandedUser[];
    isLoading?: boolean;
    view?: ArticleView;
    target?: HTMLAttributeAnchorTarget;
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
            view = ArticleView.SMALL,
            isLoading,
            target,
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
                        isAdmin
                        onApproveClick={props.onApproveClick}
                    />
                );
            return (
                <ArticleListItem
                    article={article}
                    view={view}
                    key={article.id}
                    target={target}
                />
            );
        };

        if (!isLoading && !articles?.length) {
            return (
                <div className={classNames('', {}, [className, cls[view]])}>
                    <Text size="l" title={t('No articles found')} />
                </div>
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
