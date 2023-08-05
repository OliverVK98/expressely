import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '../../model/selectors/getUserAuthData/getUserAuthData';
import { User } from '../..';
import { ArticleType } from '@/entities/Article';

interface PreferenceArg {
    preference: ArticleType;
    action: 'add' | 'delete';
}

export const updateUserPreferences = createAsyncThunk<
    User,
    PreferenceArg,
    ThunkConfig<string>
>('user/updateUserPreferences', async ({ preference, action }, thunkAPI) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkAPI;
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

        // const response = await dispatch(
        //     setJsonSettingsMutation({
        //         ...currentSettings,
        //         ...newJsonSettings,
        //     }),
        // ).unwrap();

        if (!response) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        return rejectWithValue('error');
    }
});
