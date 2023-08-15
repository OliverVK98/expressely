import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '../../../../../entities/Profile';

export const fetchAuthProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<string>
>('profile/fetchAuthProfileData', async (_, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<Profile>(`/profiles`);

        // @ts-ignore
        if (response.data?.message === 'Unauthorized') {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
