import { HTMLAttributeAnchorTarget, memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleShortList.module.scss';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Article } from '../../model/types/article';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { Card } from '@/shared/ui/Card';

interface ArticleShortListProps {
    className?: string;
    article: Article;
    target: HTMLAttributeAnchorTarget;
}

export const ArticleShortList = memo((props: ArticleShortListProps) => {
    const { className, target, article } = props;

    return (
        <Card
            max
            className={classNames(cls.ArticleShortList, {}, [className])}
            border="default"
        >
            <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                <VStack max gap="4">
                    {article.title}
                    <HStack max justify="between">
                        <HStack>
                            {article.views}
                            <Icon Svg={EyeIcon} />
                        </HStack>
                        {article.type.slice(0, 2).join(', ')}
                    </HStack>
                </VStack>
            </AppLink>
        </Card>
    );
});
