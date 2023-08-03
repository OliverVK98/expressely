import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfilePublicData = (state: StateSchema) =>
    state.profile?.publicData;
