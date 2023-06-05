import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../../model/types/index';
import { articleDetailsPageRecommendationsReducer } from './adrticleDetailsPageRecommendationsSlice';
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice';

export const articleDetailsPageReducer =
    combineReducers<ArticleDetailsPageSchema>({
        recommendations: articleDetailsPageRecommendationsReducer,
        comments: articleDetailsCommentsReducer,
    });
