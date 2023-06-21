import {
    ArticleSortField,
    ArticleView,
    ArticleBlockType,
    ArticleType,
} from './model/consts/consts';
import { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';
import { Article } from './model/types/article';
import { ArticleDetailsSchema } from './model/types/articleDetailsSchema';
import { getArticleDetailsData } from './model/selectors/getArticleDetails';
import { ArticleList } from './ui/ArticleList/ArticleList';
import { articleDetailsReducer } from './model/slice/articleDetailsSlice';
import { ArticleShortList } from './ui/ArticleShortList/ArticleShortList';

export {
    ArticleDetails,
    type Article,
    type ArticleDetailsSchema,
    ArticleBlockType,
    getArticleDetailsData,
    ArticleView,
    ArticleSortField,
    ArticleType,
    ArticleList,
    articleDetailsReducer,
    ArticleShortList,
};
