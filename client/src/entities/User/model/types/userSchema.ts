import { UserRole } from '../consts/consts';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { JsonSettings } from './jsonSettings';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ArticleType } from '@/entities/Article';

export interface User {
    id: number;
    username: string;
    avatar: string | null;
    roles: UserRole[];
    features: FeatureFlags;
    jsonSettings: JsonSettings;
    preferences: ArticleType[] | null;
}

export interface CreateUserDto {
    email: string;
    password: string;
    username: string;
    avatar?: string;
    firstname: string;
    lastname: string;
    age: number;
    country: Country;
    currency: Currency;
    city: string;
}

export interface ServerUserResponse extends User {
    accessToken: string;
}

export interface UserSchema {
    authData?: User;
    _init: boolean;
}
