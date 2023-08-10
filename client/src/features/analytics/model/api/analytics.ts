import { rtkApi } from '@/shared/api/rtkApi';

const analyticsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesAnalytics: build.query<Record<string, number>, number>({
            query: (year) => ({
                url: `/admin/analytics/articles/${year}`,
            }),
        }),
        getCommentsAnalytics: build.query<Record<string, number>, number>({
            query: (year) => ({
                url: `/admin/analytics/comments/${year}`,
            }),
        }),
        getUsersAnalytics: build.query<Record<string, number>, number>({
            query: (year) => ({
                url: `/admin/analytics/users/${year}`,
            }),
        }),
        getViewsAnalytics: build.query<Record<string, number>, number>({
            query: (year) => ({
                url: `/admin/analytics/views/${year}`,
            }),
        }),
    }),
});

export const useGetArticlesAnalytics =
    analyticsApi.useGetArticlesAnalyticsQuery;

export const useGetUsersAnalytics = analyticsApi.useGetUsersAnalyticsQuery;

export const useGetCommentsAnalytics =
    analyticsApi.useGetCommentsAnalyticsQuery;

export const useGetViewsAnalytics = analyticsApi.useGetViewsAnalyticsQuery;
