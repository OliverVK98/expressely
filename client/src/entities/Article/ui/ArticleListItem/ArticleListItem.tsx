import { useTranslation } from 'react-i18next';
import { HTMLAttributeAnchorTarget, memo } from 'react';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { AppImage } from '@/shared/ui/AppImage';
import { Button } from '@/shared/ui/Button';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import { Avatar } from '@/shared/ui/Avatar';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { ArticleBlockType, ArticleView } from '../../model/consts/consts';
import {
    ArticleTextBlock,
    ArticleExpandedUser,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import {
    getRouteArticleDetails,
    getRouteArticlePreview,
    getRouteProfile,
} from '@/shared/const/router';
import { HStack, VStack } from '@/shared/ui/Stack';

interface ArticleListItemBaseProps {
    className?: string;
    article: ArticleExpandedUser;
    view: ArticleView;
    target?: HTMLAttributeAnchorTarget;
    isPendingArticles?: boolean;
}
interface ArticleListItemProps extends ArticleListItemBaseProps {
    isAdmin?: false;
}

interface ArticleAdminListItemProps extends ArticleListItemBaseProps {
    isAdmin: true;
    onApproveClick: (id: number) => void;
}

export const ArticleListItem = memo(
    (props: ArticleListItemProps | ArticleAdminListItemProps) => {
        const {
            className,
            article,
            view,
            target,
            isAdmin,
            isPendingArticles = false,
        } = props;
        const { t } = useTranslation();

        const userInfo = (
            <AppLink to={getRouteProfile(article.user.id)}>
                <HStack gap="4" max>
                    <Avatar
                        size={32}
                        src={article.user.avatar}
                        className={cls.avatar}
                    />
                    <Text bold text={article.user.username} />
                </HStack>
            </AppLink>
        );
        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text text={String(article.views)} className={cls.views} />
            </HStack>
        );

        if (view === ArticleView.BIG) {
            const textBlock = article.blocks.find(
                (block) => block.type === ArticleBlockType.TEXT,
            ) as ArticleTextBlock;

            return (
                <Card
                    padding="24"
                    max
                    data-testid="ArticleListItem"
                    className={classNames(cls.card, {}, [className, cls[view]])}
                >
                    <VStack max gap="16">
                        <HStack max justify="between">
                            <AppLink to={getRouteProfile(article.user.id)}>
                                <HStack gap="8">
                                    <Avatar
                                        size={32}
                                        src={article.user.avatar}
                                    />
                                    <Text bold text={article.user.username} />
                                    <Text
                                        text={article.createdAt}
                                        className={cls.date}
                                    />
                                </HStack>
                            </AppLink>
                            <Text
                                text={`Tags: ${article.type
                                    .slice(0, 3)
                                    .join(', ')}`}
                                bold
                            />
                        </HStack>
                        <Text
                            title={article.title}
                            bold
                            className={cls.title}
                        />
                        <Text
                            title={article.subtitle}
                            size="s"
                            className={cls.title}
                            style={{ marginTop: '-14px' }}
                        />
                        <AppImage
                            fallback={<Skeleton width="100%" height={250} />}
                            src={article.img}
                            className={cls.img}
                            alt={article.title}
                        />
                        {textBlock && (
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs.slice(0.2).join(' ')}
                            />
                        )}
                        <HStack max justify="between">
                            {!isPendingArticles && (
                                <AppLink
                                    target={target}
                                    to={
                                        isAdmin
                                            ? getRouteArticlePreview(article.id)
                                            : getRouteArticleDetails(article.id)
                                    }
                                >
                                    <Button variant="outline">
                                        {t('Continue reading...')}
                                    </Button>
                                </AppLink>
                            )}
                            {isAdmin && (
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        props.onApproveClick(article.id)
                                    }
                                    color="success"
                                >
                                    {t('Approve')}
                                </Button>
                            )}
                            {!isAdmin && !isPendingArticles && views}
                        </HStack>
                    </VStack>
                </Card>
            );
        }

        return (
            <Card
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                    cls.card,
                ])}
                border="default"
                padding="0"
                max
            >
                <VStack className={cls.info} gap="4">
                    <AppLink
                        data-testid="ArticleListItem"
                        target={target}
                        to={getRouteArticleDetails(article.id)}
                    >
                        <AppImage
                            fallback={<Skeleton width="100%" height={200} />}
                            alt={article.title}
                            src={article.img}
                            className={cls.img}
                        />
                        <Text
                            text={article.title}
                            bold
                            size="m"
                            className={cls.title}
                        />
                    </AppLink>
                    <VStack gap="4" className={cls.footer} max>
                        <HStack justify="between" max>
                            <Text
                                text={article.createdAt}
                                className={cls.date}
                            />
                            {views}
                        </HStack>
                        {userInfo}
                    </VStack>
                </VStack>
            </Card>
        );
    },
);
