import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { PublicProfile } from '../../../../../entities/Profile';

export const fetchProfileData = createAsyncThunk<
    PublicProfile,
    number,
    ThunkConfig<string>
>('profile/fetchProfileData', async (userId, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.get<PublicProfile>(
            `/profiles/${userId}`,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
