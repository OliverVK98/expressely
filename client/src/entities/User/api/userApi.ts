import { rtkApi } from '@/shared/api/rtkApi';
import { LoginUserResponse, User } from '../model/types/userSchema';
import { JsonSettings } from '../model/types/jsonSettings';

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, JsonSettings>({
            query: (jsonSettings) => ({
                url: `/users/set-json`,
                method: 'PATCH',
                body: jsonSettings,
            }),
        }),
        // TODO: TYPE IS INCORRECT, SHOULD BE JUST USER
        getUserDataById: build.mutation<LoginUserResponse, number>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate;

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate;
