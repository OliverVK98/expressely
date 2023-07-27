import axios from 'axios';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { ServerUserResponse, userActions } from '@/entities/User';
import { store } from '@/app/providers/StoreProvider/ui/StoreProvider';

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
    // validateStatus: (status) => status === 401 || status === 200,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        // eslint-disable-next-line
        config.headers.Authorization = `Bearer ${localStorage.getItem(
            TOKEN_LOCALSTORAGE_KEY,
        )}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            try {
                const response = await axios.get<ServerUserResponse>(
                    `${__API__}/auth/refresh`,
                    { withCredentials: true },
                );
                localStorage.setItem(
                    TOKEN_LOCALSTORAGE_KEY,
                    response.data.accessToken,
                );
                return $api.request(originalRequest);
            } catch (err) {
                console.log('User not authed', err);
            }
        }
        store.dispatch(userActions.logout());
        throw error;
    },
);
