import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleCreateDto } from '@/entities/Article';

export const addNewArticle = createAsyncThunk<
    Article,
    ArticleCreateDto,
    ThunkConfig<string>
>('ArticleCreatePage/addNewArticle', async (article, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<Article>(
            '/articles/create',
            article,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
