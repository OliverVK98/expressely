import { rtkApi } from '@/shared/api/rtkApi';
import { ArticlesExpandedUserServerResponse } from '@/entities/Article';

const articlesRecommendationsListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendationsList: build.query<
            ArticlesExpandedUserServerResponse,
            number
        >({
            query: (limit) => ({
                url: '/articles',
                params: {
                    limit,
                    expand: 'user',
                },
            }),
        }),
    }),
});

export const useArticleRecommendations =
    articlesRecommendationsListApi.useGetArticlesRecommendationsListQuery;
