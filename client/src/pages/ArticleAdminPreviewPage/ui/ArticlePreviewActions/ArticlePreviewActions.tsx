import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { Button } from '@/shared/ui/Button';
import cls from './ArticlePreviewActions.module.scss';
import { Skeleton } from '@/shared/ui/Skeleton';
import { useUpdateArticleApprovalStatus } from '../../model/api/getArticle';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteAdmin } from '@/shared/const/router';

interface ArticlePreviewActionsProps {
    className?: string;
    articleId: number;
    isLoading: boolean;
    isError: boolean;
}

export const ArticlePreviewActions = (props: ArticlePreviewActionsProps) => {
    const { className, articleId, isLoading, isError } = props;
    const { t } = useTranslation();
    const [approveArticleWithId] = useUpdateArticleApprovalStatus();
    const navigate = useNavigate();

    const onApproveClick = useCallback(async () => {
        await approveArticleWithId(articleId);
        navigate(getRouteAdmin());
    }, [approveArticleWithId, articleId]);

    if (isLoading || isError)
        return <Skeleton className={className} width="max" height={200} />;

    return (
        <Card className={className} padding="16">
            <VStack gap="32">
                <Button
                    className={cls.button}
                    color="success"
                    onClick={onApproveClick}
                >
                    {t('Approve')}
                </Button>
                <AppLink to={getRouteAdmin()} className={cls.button}>
                    <Button className={cls.button}>{t('Go Back')}</Button>
                </AppLink>
            </VStack>
        </Card>
    );
};
