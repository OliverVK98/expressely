import { rtkApi } from '@/shared/api/rtkApi';

const analyticsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesAnalytics: build.query<Record<string, number>, void>({
            query: () => ({
                url: '/admin/analytics/articles',
            }),
        }),
    }),
});

export const useGetArticlesAnalytics =
    analyticsApi.useGetArticlesAnalyticsQuery;
