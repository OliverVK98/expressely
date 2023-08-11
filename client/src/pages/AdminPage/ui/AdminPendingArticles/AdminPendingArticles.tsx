import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import {
    useGetAdminPageArticles,
    useUpdateArticleApprovalStatus,
} from '../../model/api/adminPageArticles';

export const AdminPendingArticles = memo(() => {
    const { t } = useTranslation();
    const { data, isLoading, error, refetch } = useGetAdminPageArticles();
    const [approveArticleWithId] = useUpdateArticleApprovalStatus();
    const handleApproveArticle = useCallback(
        async (id: number) => {
            await approveArticleWithId(id);
            refetch();
        },
        [approveArticleWithId, refetch],
    );

    return (
        <ArticleList
            articles={data}
            isLoading={isLoading}
            view={ArticleView.BIG}
            isAdmin
            onApproveClick={handleApproveArticle}
        />
    );
});
