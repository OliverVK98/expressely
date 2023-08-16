import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Profile } from '../../../../../entities/Profile';
import { ProfileFormValues } from '../../types/profileFormValues';
import { userActions } from '@/entities/User';

export const updateProfileData = createAsyncThunk<
    Profile,
    Partial<ProfileFormValues> & { avatar?: string | null },
    ThunkConfig<string>
>('profile/updateProfileData', async (formData, thunkAPI) => {
    const { extra, rejectWithValue, dispatch } = thunkAPI;

    try {
        const response = await extra.api.put<Profile>(
            `/profiles/update`,
            formData,
        );

        dispatch(userActions.updateUserAvatar(response.data.avatar));

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
