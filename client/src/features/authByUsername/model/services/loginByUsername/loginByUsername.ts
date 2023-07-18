import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginUserResponse, userActions } from '@/entities/User';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { ThunkConfig } from '@/app/providers/StoreProvider';

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    LoginUserResponse,
    LoginByUsernameProps,
    ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
    const { dispatch, extra, rejectWithValue } = thunkAPI;

    try {
        const response = await extra.api.post<LoginUserResponse>(
            'auth/sign-in',
            authData,
        );

        if (!response.data) {
            throw new Error();
        }

        localStorage.setItem(
            TOKEN_LOCALSTORAGE_KEY,
            JSON.stringify(response.data.accessToken),
        );
        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
