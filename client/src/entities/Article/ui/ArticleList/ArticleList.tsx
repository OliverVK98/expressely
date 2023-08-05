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
}

const getSkeletons = (view: ArticleView) =>
    new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ));

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        view = ArticleView.SMALL,
        isLoading,
        target,
    } = props;
    const { t } = useTranslation();

    const renderArticle = (article: ArticleExpandedUser) => (
        <ArticleListItem
            article={article}
            view={view}
            key={article.id}
            target={target}
        />
    );

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
        >
            {isLoading && getSkeletons(view)}
            {articles?.length && articles?.length > 0
                ? articles?.map(renderArticle)
                : null}
        </HStack>
    );
});
