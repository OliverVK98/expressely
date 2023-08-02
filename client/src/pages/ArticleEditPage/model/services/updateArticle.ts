import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router-dom';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleEditDto } from '@/entities/Article';
import { getRouteArticleDetails } from '@/shared/const/router';

interface UpdateArticleArgs {
    article: ArticleEditDto;
    navigate: NavigateFunction;
}

export const updateArticle = createAsyncThunk<
    void,
    UpdateArticleArgs,
    ThunkConfig<string>
>('ArticleEditPage/updateArticle', async ({ article, navigate }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.patch<Article>(
            '/articles/update',
            article,
        );

        if (!response.data) {
            throw new Error();
        }

        navigate(getRouteArticleDetails(article.id));
    } catch (e) {
        return rejectWithValue('error');
    }
});
