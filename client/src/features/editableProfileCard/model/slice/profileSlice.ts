import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileSchema } from '../../model/types/editableProfileCardSchema';
import {
    EditableProfileFields,
    Profile,
    PublicProfile,
    UpdateProfileDto,
} from '@/entities/Profile';
import { fetchAuthProfileData } from '../services/fetchAuthProfileData/fetchAuthProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';

const initialState: ProfileSchema = {
    data: {} as Profile,
    form: {} as EditableProfileFields,
    publicData: {} as PublicProfile,
    error: undefined,
    isLoading: false,
    readonly: true,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.validateErrors = undefined;
            state.form = state.data;
        },
        updateProfile: (state, action: PayloadAction<UpdateProfileDto>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
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
                    state.data = action.payload;
                    state.form = action.payload;
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
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(
                updateProfileData.fulfilled,
                (state, action: PayloadAction<Profile>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                    state.readonly = true;
                    state.validateErrors = undefined;
                },
            )
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
