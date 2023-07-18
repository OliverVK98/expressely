import { UserRole } from '../consts/consts';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from './jsonSettings';

export interface User {
    id: number;
    username: string;
    avatar: string | null;
    roles: UserRole[];
    features: FeatureFlags;
    jsonSettings: JsonSettings;
}

export interface LoginUserResponse extends User {
    accessToken: string;
}

export interface UserSchema {
    authData?: User;
    _init: boolean;
}
