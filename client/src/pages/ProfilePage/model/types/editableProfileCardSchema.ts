import { Profile, PublicProfile } from '@/entities/Profile';

export interface ProfileSchema {
    authData: Profile;
    publicData: PublicProfile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    imageError?: string;
}
