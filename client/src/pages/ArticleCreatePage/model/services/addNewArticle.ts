import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleCreateDto } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';

interface AddArticleArgs {
    article: ArticleCreateDto;
    navigate: NavigateFunction;
}

export const addNewArticle = createAsyncThunk<
    Article,
    AddArticleArgs,
    ThunkConfig<string>
>(
    'ArticleCreatePage/addNewArticle',
    async ({ article, navigate }, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        if (!article) {
            return rejectWithValue('no data');
        }

        try {
            const { data } = await extra.api.post<Article>(
                '/articles/create',
                article,
            );

            if (!data) {
                throw new Error();
            }

            navigate(getRouteArticleDetails(data.id));

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
