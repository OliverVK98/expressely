import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { userActions } from '@/entities/User';

const baseQuery = fetchBaseQuery({
    baseUrl: __API__,
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    console.log('Result 1:', result); // Debug line

    if (result.error && result.error.status === 401) {
        const response = await baseQuery('/auth/refresh', api, extraOptions);
        console.log('Response:', response); // Debug line

        if (response.data) {
            localStorage.setItem(
                TOKEN_LOCALSTORAGE_KEY,
                // @ts-ignore
                response.data.accessToken,
            );
            result = await baseQuery(args, api, extraOptions);

            console.log('Result 2:', result); // Debug line

            if (result.error && result.error.status === 401) {
                // ...
            }
        } else {
            console.log('dispatched?');
            api.dispatch(userActions.logout());
        }
    }
    return result;
};

export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});
