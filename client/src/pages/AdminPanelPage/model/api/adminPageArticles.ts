import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleExpandedUser } from '@/entities/Article';

const userHistoryArticlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAdminPageArticles: build.query<ArticleExpandedUser[], void>({
            query: () => ({
                url: '/articles/admin',
            }),
            keepUnusedDataFor: 0,
        }),
        updateApprovalStatus: build.mutation<ArticleExpandedUser[], number>({
            query: (articleId) => ({
                url: '/articles/approve',
                method: 'PATCH',
                body: {
                    articleId,
                },
            }),
        }),
    }),
});

export const useGetAdminPageArticles =
    userHistoryArticlesApi.useGetAdminPageArticlesQuery;

export const useUpdateArticleApprovalStatus =
    userHistoryArticlesApi.useUpdateApprovalStatusMutation;
