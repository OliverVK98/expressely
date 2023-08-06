import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const addArticleToHistory = createAsyncThunk<
    void,
    number,
    ThunkConfig<string>
>('articleDetailsPage/incrementArticleViews', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        await extra.api.patch<void>(`/articles/history`, {
            articleId,
        });
    } catch (e) {
        return rejectWithValue('error');
    }
});
