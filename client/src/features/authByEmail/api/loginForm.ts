import { rtkApi } from '@/shared/api/rtkApi';
import { ServerUserResponse } from '@/entities/User';

interface LoginByUsernameProps {
    email: string;
    password: string;
}

const loginFormApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        loginUser: build.mutation<ServerUserResponse, LoginByUsernameProps>({
            query: ({ email, password }) => ({
                url: '/auth/sign-in',
                method: 'POST',
                body: {
                    password,
                    email,
                },
            }),
        }),
    }),
});

export const useGetLoginUser = loginFormApi.useLoginUserMutation;
