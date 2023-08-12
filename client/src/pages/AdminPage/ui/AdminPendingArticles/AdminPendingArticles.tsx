import React, { memo, useCallback } from 'react';
import { ArticleList, ArticleView } from '@/entities/Article';
import {
    useGetAdminPageArticles,
    useUpdateArticleApprovalStatus,
} from '../../model/api/adminPageArticles';
import { ErrorCard } from '@/shared/ui/ErrorCard';

export const AdminPendingArticles = memo(() => {
    const { data, isLoading, error, refetch } = useGetAdminPageArticles();
    const [approveArticleWithId] = useUpdateArticleApprovalStatus();
    const handleApproveArticle = useCallback(
        async (id: number) => {
            await approveArticleWithId(id);
            refetch();
        },
        [approveArticleWithId, refetch],
    );

    if (error) return <ErrorCard />;

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
