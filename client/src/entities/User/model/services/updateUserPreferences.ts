import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '../../model/selectors/getUserAuthData/getUserAuthData';
import { User } from '../../model/types/userSchema';
import { UserArticleType } from '@/entities/Article';

interface PreferenceArg {
    preference: UserArticleType;
    action: 'add' | 'delete';
}

export const updateUserPreferences = createAsyncThunk<
    User,
    PreferenceArg,
    ThunkConfig<string>
>('user/updateUserPreferences', async ({ preference, action }, thunkAPI) => {
    const { extra, rejectWithValue, getState } = thunkAPI;
    const userData = getUserAuthData(getState());

    if (!userData) {
        return rejectWithValue('');
    }

    try {
        const { data: response } = await extra.api.patch<User>(
            '/users/preferences',
            {
                preference,
                action,
            },
        );

        if (!response) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        return rejectWithValue('error');
    }
});
