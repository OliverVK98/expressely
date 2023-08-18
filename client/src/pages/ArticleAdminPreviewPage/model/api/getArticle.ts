import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleExpandedUser } from '@/entities/Article';

const getAdminArticleApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotApprovedArticleWithId: build.query<ArticleExpandedUser, number>({
            query: (articleId) => ({
                url: `/admin/get-pending-article/${articleId}`,
            }),
        }),
        updateApprovalStatus: build.mutation<ArticleExpandedUser[], number>({
            query: (articleId) => ({
                url: '/admin/approve-article',
                method: 'PATCH',
                body: {
                    articleId,
                },
            }),
        }),
    }),
});

export const useGetNotApprovedArticle =
    getAdminArticleApi.useGetNotApprovedArticleWithIdQuery;

export const useUpdateArticleApprovalStatus =
    getAdminArticleApi.useUpdateApprovalStatusMutation;
