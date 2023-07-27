import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { JsonSettings } from '../types/jsonSettings';
import { getUserAuthData } from '../../model/selectors/getUserAuthData/getUserAuthData';
import { getJsonSettings } from '../selectors/getUserJsonSettings/getUserJsonSettings';
import { User } from '../..';

export const saveJsonSettings = createAsyncThunk<
    JsonSettings,
    Partial<JsonSettings>,
    ThunkConfig<string>
>('user/jsonSettings', async (newJsonSettings, thunkAPI) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkAPI;
    const userData = getUserAuthData(getState());
    const currentSettings = getJsonSettings(getState());

    if (!userData) {
        return rejectWithValue('');
    }

    try {
        const { data: response } = await extra.api.patch<User>(
            '/users/set-json',
            {
                ...currentSettings,
                ...newJsonSettings,
            },
        );

        // const response = await dispatch(
        //     setJsonSettingsMutation({
        //         ...currentSettings,
        //         ...newJsonSettings,
        //     }),
        // ).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('');
        }

        return response.jsonSettings;
    } catch (e) {
        return rejectWithValue('error');
    }
});
