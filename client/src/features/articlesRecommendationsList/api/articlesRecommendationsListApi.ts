import { rtkApi } from '@/shared/api/rtkApi';
import {
    ArticlesExpandedUserServerResponse,
    ArticleSortField,
    ArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

interface ArticlesRecommendationsListOptions {
    order?: SortOrder;
    sort?: ArticleSortField;
    search?: 'string';
    type?: ArticleType;
    expand?: 'user';
    limit?: number;
}

const articlesRecommendationsListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendationsList: build.query<
            ArticlesExpandedUserServerResponse,
            ArticlesRecommendationsListOptions
        >({
            query: ({ limit, order, expand, sort, search, type }) => ({
                url: '/articles',
                params: {
                    limit,
                    order,
                    expand,
                    sort,
                    search,
                    type,
                },
            }),
        }),
    }),
});

export const useArticleRecommendations =
    articlesRecommendationsListApi.useGetArticlesRecommendationsListQuery;
