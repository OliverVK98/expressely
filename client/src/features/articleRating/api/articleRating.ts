import { rtkApi } from '@/shared/api/rtkApi';
import { Rating, CreateRatingDto } from '@/entities/Rating';

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<
            Rating,
            { userId: number; articleId: number }
        >({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, CreateRatingDto>({
            query: (arg) => ({
                url: '/article-ratings/new',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
});

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const useRateArticle = articleRatingApi.useRateArticleMutation;
