import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticlesExpandedUserServerResponse } from '@/entities/Article';
import { getMainPageFeedType } from '../selectors/mainPageSelectors';

export const fetchFeedTypeArticles = createAsyncThunk<
    ArticlesExpandedUserServerResponse,
    void,
    ThunkConfig<string>
>('mainPage/fetchFeedTypeArticles', async (_, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;

    const feedType = getMainPageFeedType(getState());

    try {
        const response = extra.api.get<ArticlesExpandedUserServerResponse[]>();

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
