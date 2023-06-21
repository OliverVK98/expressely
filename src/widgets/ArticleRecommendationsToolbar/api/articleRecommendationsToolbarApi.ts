import { rtkApi } from '@/shared/api/rtkApi';
import { Article } from '@/entities/Article';

const toolbarRecommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleToolbarRecommendations: build.query<Article[], number>({
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

export const useArticleToolbarRecommendations =
    toolbarRecommendationsApi.useGetArticleToolbarRecommendationsQuery;
