import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleExpandedUser } from '../../types/article';

export const fetchArticleById = createAsyncThunk<
    ArticleExpandedUser,
    string,
    ThunkConfig<string>
>('article/fetchArticleById', async (articleId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<ArticleExpandedUser>(
            `/articles/${articleId}`,
            {
                params: {
                    expand: 'user',
                },
            },
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
