import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleCreateDto } from '@/entities/Article';

export const addNewArticle = createAsyncThunk<
    void,
    ArticleCreateDto,
    ThunkConfig<string>
>('ArticleCreatePage/addNewArticle', async (article, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    if (!article) {
        return rejectWithValue('no data');
    }

    // TODO: fix response
    try {
        const response = await extra.api.post<null>('/articles', article);

        if (!response.data) {
            throw new Error();
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
