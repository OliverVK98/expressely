import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

const articlesRecommendationsListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
});

export const useArticleRecommendations =
    articlesRecommendationsListApi.useGetArticlesRecommendationsListQuery;
