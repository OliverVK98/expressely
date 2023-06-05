import { rtkApi } from '@/shared/api/rtkApi';
import { User } from '../model/types/userSchema';
import { JsonSettings } from '../model/types/jsonSettings';

interface SetJsonSettingsArg {
    jsonSettings: JsonSettings;
    userId: string;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        setJsonSettings: build.mutation<User, SetJsonSettingsArg>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: { jsonSettings },
            }),
        }),
        getUserDataById: build.mutation<User, string>({
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
