import { ArticleDetailsCommentsSchema } from '../../model/types/ArticleDetailsCommentsSchema';
import { ArticleDetailsRecommendationsSchema } from '../../model/types/ArticleDetailsRecommendationsSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema;
    recommendations: ArticleDetailsRecommendationsSchema;
}
