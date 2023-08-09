import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleExpandedUser } from '@/entities/Article';

const userHistoryArticlesApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserHistoryArticles: build.query<ArticleExpandedUser[], void>({
            query: () => ({
                url: '/articles/history',
            }),
            keepUnusedDataFor: 0,
        }),
        getUserCustomFeedArticles: build.query<ArticleExpandedUser[], void>({
            query: () => ({
                url: '/articles/custom-feed',
            }),
            keepUnusedDataFor: 0,
        }),
        getUserArticles: build.query<ArticleExpandedUser[], boolean>({
            query: (approvedArticles) => ({
                url: approvedArticles
                    ? '/articles/user'
                    : '/articles/user/pending',
            }),
            keepUnusedDataFor: 0,
        }),
    }),
});

export const useGetUserHistoryArticles =
    userHistoryArticlesApi.useGetUserHistoryArticlesQuery;

export const useGetUserCustomFeedArticles =
    userHistoryArticlesApi.useGetUserCustomFeedArticlesQuery;

export const userGetUserArticles =
    userHistoryArticlesApi.useGetUserArticlesQuery;
