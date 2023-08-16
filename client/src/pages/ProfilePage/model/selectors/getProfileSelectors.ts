import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state.profile?.authData;
export const getProfileError = (state: StateSchema) => state.profile?.error;
export const getProfileImageError = (state: StateSchema) =>
    state.profile?.imageError;
export const getProfileIsLoading = (state: StateSchema) =>
    state.profile?.isLoading;
export const getProfilePublicData = (state: StateSchema) =>
    state.profile?.publicData;
export const getProfileReadonly = (state: StateSchema) =>
    state.profile?.readonly;
