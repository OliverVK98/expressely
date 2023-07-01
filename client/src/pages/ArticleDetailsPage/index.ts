import { ArticleDetailsPageAsync } from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
import { ArticleDetailsCommentsSchema } from './model/types/ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from './model/types/ArticleDetailsRecommendationsSchema';
import { ArticleDetailsPageSchema } from './model/types';
import { articleDetailsPageReducer } from './model/slices';

export {
    ArticleDetailsPageAsync as ArticleDetailsPage,
    type ArticleDetailsCommentsSchema,
    type ArticleDetailsRecommendationsSchema,
    type ArticleDetailsPageSchema,
    articleDetailsPageReducer,
};
