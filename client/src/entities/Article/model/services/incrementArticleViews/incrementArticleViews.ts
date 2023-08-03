import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';

export const incrementArticleViews = createAsyncThunk<
    void,
    { id: number },
    ThunkConfig<string>
>('articleDetailsPage/incrementArticleViews', async ({ id }, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        await extra.api.get<void>(`/articles/view-increment/${id}`);
    } catch (e) {
        return rejectWithValue('error');
    }
});
