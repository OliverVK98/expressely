import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
import {
    Article, ArticleView, ArticleSortField, ArticleType,
} from './model/types/article';
import { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
import { getArticleDetailsData } from './model/selectors/getArticleDetails';
import { ArticleViewSelector } from './ui/ArticleViewSelector/ArticleViewSelector';
import { ArticleTypeTabs } from './ui/ArticleTypeTabs/ArticleTypeTabs';

export {
    ArticleDetails,
    Article,
    ArticleDetailsSchema,
    getArticleDetailsData,
    ArticleView,
    ArticleViewSelector,
    ArticleSortField,
    ArticleType,
    ArticleTypeTabs,
};
