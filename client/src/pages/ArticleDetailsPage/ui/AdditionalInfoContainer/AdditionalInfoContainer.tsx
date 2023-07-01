import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo';
import { getArticleDetailsData } from '@/entities/Article';
import cls from './AdditionalInfoContainer.module.scss';
import { getRouteArticleEdit } from '@/shared/const/router';
import { getCanEditArticle } from '../../model/selectors/article';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';

export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData);
    const navigate = useNavigate();
    const canEdit = useSelector(getCanEditArticle);

    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id));
        }
    }, [navigate, article]);

    if (!article) {
        return (
            <Card padding="24" border="partial">
                <VStack max gap="32">
                    <Skeleton width={150} height={20} />
                    <Skeleton width={150} height={20} />
                    <Skeleton width={150} height={20} />
                </VStack>
            </Card>
        );
    }

    return (
        <Card className={cls.card} padding="24" border="partial">
            <ArticleAdditionalInfo
                canEdit={canEdit}
                onEdit={onEditArticle}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    );
});
