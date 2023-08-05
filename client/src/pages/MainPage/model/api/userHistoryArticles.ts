import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleExpandedUser } from '@/entities/Article';

const userHistoryArticlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserHistoryArticles: build.query<ArticleExpandedUser[], void>({
            query: () => ({
                url: '/articles/history',
            }),
        }),
    }),
});

export const useGetUserHistoryArticles =
    userHistoryArticlesApi.useGetUserHistoryArticlesQuery;
