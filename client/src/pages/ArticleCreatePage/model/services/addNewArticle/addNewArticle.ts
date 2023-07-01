import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleServerSchema } from '../../types/articleCreatePageSchema';

export const addNewArticle = createAsyncThunk<
    void,
    ArticleServerSchema,
    ThunkConfig<string>
>('ArticleCreatePage/addNewArticle', async (article, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!article) {
        return rejectWithValue('no data');
    }

    try {
        const response = await extra.api.post<ArticleServerSchema>(
            '/articles',
            article,
        );

        if (!response.data) {
            throw new Error();
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
