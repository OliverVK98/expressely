import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '../../../../../entities/Profile';
import { ProfileFormValues } from '../../types/profileFormValues';

export const updateProfileData = createAsyncThunk<
    Profile,
    ProfileFormValues,
    ThunkConfig<string>
>('profile/updateProfileData', async (formData, thunkAPI) => {
    const { extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.put<Profile>(
            `/profiles/update`,
            formData,
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
