import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleExpandedUser } from '@/entities/Article';
import { User, UserRole } from '@/entities/User';

interface UpdateUserRoleArgs {
    userId: number;
    role: UserRole;
}

const userHistoryArticlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getAdminPageArticles: build.query<ArticleExpandedUser[], void>({
            query: () => ({
                url: '/admin/get-pending-articles',
            }),
            keepUnusedDataFor: 0,
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
        getUserList: build.query<User[], void>({
            query: () => ({
                url: '/admin/userlist',
            }),
            keepUnusedDataFor: 0,
        }),
        updateUserRole: build.mutation<User, UpdateUserRoleArgs>({
            query: ({ userId, role }) => ({
                url: '/admin/update-user-role',
                method: 'PATCH',
                body: {
                    userId,
                    role,
                },
            }),
        }),
    }),
});

export const useGetAdminPageArticles =
    userHistoryArticlesApi.useGetAdminPageArticlesQuery;

export const useUpdateArticleApprovalStatus =
    userHistoryArticlesApi.useUpdateApprovalStatusMutation;

export const useGetUserList = userHistoryArticlesApi.useGetUserListQuery;

export const useUpdateUserRole =
    userHistoryArticlesApi.useUpdateUserRoleMutation;
