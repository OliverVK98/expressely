import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema } from '../../model/types/editableProfileCardSchema';
import { Profile, PublicProfile } from '@/entities/Profile';
import { fetchAuthProfileData } from '../services/fetchAuthProfileData/fetchAuthProfileData';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';

const initialState: ProfileSchema = {
    authData: {} as Profile,
    publicData: {} as PublicProfile,
    error: undefined,
    isLoading: false,
    readonly: true,
    imageError: '',
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        setProfileImageError: (state, action: PayloadAction<string>) => {
            state.imageError = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.imageError = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAuthProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.authData = action.payload;
                },
            )
            .addCase(fetchAuthProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchProfileData.fulfilled,
                (state, action: PayloadAction<PublicProfile>) => {
                    state.isLoading = false;
                    state.publicData = action.payload;
                },
            )
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.authData = action.payload;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
