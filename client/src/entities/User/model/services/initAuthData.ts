import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserDataByIdQuery } from '../../api/userApi';
import { LoginUserResponse } from '../../model/types/userSchema';
import { getUserAuthData } from '../../model/selectors/getUserAuthData/getUserAuthData';

export const initAuthData = createAsyncThunk<
    LoginUserResponse,
    void,
    ThunkConfig<string>
>('user/initAuthData', async (_, thunkAPI) => {
    const { rejectWithValue, dispatch, getState } = thunkAPI;

    const userId = getUserAuthData(getState())?.id;

    if (!userId) {
        return rejectWithValue('');
    }

    try {
        const response = await dispatch(getUserDataByIdQuery(userId)).unwrap();

        if (!response.jsonSettings) {
            return rejectWithValue('');
        }

        return response;
    } catch (e) {
        return rejectWithValue('error');
    }
});
