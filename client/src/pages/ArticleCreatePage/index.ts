import { ArticleCreatePageAsync } from './ui/ArticleCreatePage/ArticleCreatePage.async';
import { articleCreatePageReducer } from './model/slices/articleCreatePageSlice';
import { ArticleCreatePageSchema } from './model/types/articleCreatePageSchema';

export {
    ArticleCreatePageAsync as ArticleCreatePage,
    articleCreatePageReducer,
    type ArticleCreatePageSchema,
};
