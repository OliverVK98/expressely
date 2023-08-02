import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    TOKEN_LOCALSTORAGE_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localStorage';
import { ServerUserResponse, User, UserSchema } from '../types/userSchema';
import { setFeatureFlags } from '@/shared/lib/features';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { initAuthData } from '../services/initAuthData';

const initialState: UserSchema = {
    _init: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<ServerUserResponse>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload.features);
            localStorage.setItem(
                TOKEN_LOCALSTORAGE_KEY,
                String(action.payload.accessToken),
            );
            localStorage.setItem(
                USER_LOCALSTORAGE_KEY,
                String(action.payload.id),
            );
        },
        logout: (state) => {
            state.authData = undefined;
            localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
            localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            saveJsonSettings.fulfilled,
            (state, action: PayloadAction<JsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = action.payload;
                }
            },
        );
        builder
            .addCase(
                initAuthData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.authData = action.payload;
                    setFeatureFlags(action.payload.features);
                    state._init = true;
                },
            )
            .addCase(initAuthData.rejected, (state) => {
                state._init = true;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
