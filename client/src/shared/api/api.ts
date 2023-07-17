import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

export const $api = axios.create({
    baseURL: __API__,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    if (config.headers) {
        // eslint-disable-next-line
        config.headers.Authorization = `Bearer ${
            localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
        }`;
    }
    return config;
});
