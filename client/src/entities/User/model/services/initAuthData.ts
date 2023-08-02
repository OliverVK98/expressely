import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '../../model/types/userSchema';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
    'user/initAuthData',
    async (_, thunkAPI) => {
        const { rejectWithValue, extra } = thunkAPI;

        const userId = Number(localStorage.getItem(USER_LOCALSTORAGE_KEY));

        if (!userId) {
            return rejectWithValue('');
        }

        try {
            const response = await extra.api.get<User>(`/users`);

            if (!response.data.jsonSettings) {
                return rejectWithValue('');
            }

            return response.data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
