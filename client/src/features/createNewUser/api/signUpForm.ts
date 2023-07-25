import { rtkApi } from '@/shared/api/rtkApi';
import { ServerUserResponse, CreateUserDto } from '@/entities/User';

const signUpFormApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        createUser: build.mutation<ServerUserResponse, CreateUserDto>({
            query: (data) => ({
                url: '/auth/sign-up',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const useCreateUser = signUpFormApi.useCreateUserMutation;
