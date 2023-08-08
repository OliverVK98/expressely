import { rtkApi } from '@/shared/api/rtkApi';
import {
    ArticlesExpandedUserServerResponse,
    ArticleSortField,
    UserArticleType,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

interface ArticlesRecommendationsListOptions {
    order?: SortOrder;
    sort?: ArticleSortField;
    search?: 'string';
    type?: UserArticleType;
    expand?: 'user';
    limit?: number;
}

const articlesListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesList: build.query<
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

export const useArticleList = articlesListApi.useGetArticlesListQuery;
