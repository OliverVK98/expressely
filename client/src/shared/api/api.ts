import axios, { AxiosInstance } from 'axios';
import { TOKEN_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';
import { ServerUserResponse } from '@/entities/User';

interface CustomAxiosInstance extends AxiosInstance {
    logout: () => void;
}

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
}) as CustomAxiosInstance;

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
        if (error.response.status === 401) $api.logout();

        throw error;
    },
);
