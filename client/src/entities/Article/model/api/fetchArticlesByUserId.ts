import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleExpandedUser } from '../..';

const fetchArticlesByUserIdApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesByUserId: build.query<ArticleExpandedUser[], number>({
            query: (id) => ({
                url: `/articles/user/${id}`,
            }),
            keepUnusedDataFor: 0,
        }),
    }),
});

export const useGetArticlesByUserId =
    fetchArticlesByUserIdApi.useGetArticlesByUserIdQuery;
