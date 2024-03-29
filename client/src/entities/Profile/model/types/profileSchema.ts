import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

export interface Profile {
    firstname: string;
    lastname: string;
    age: number;
    currency: Currency;
    country: Country;
    city: string;
    username: string;
    avatar: string | null;
    userId: number;
}

export interface CreateProfileDto extends Omit<Profile, 'avatar' | 'userId'> {
    avatar?: string;
}

export interface PublicProfile {
    firstname: string;
    lastname: string;
    age: number;
    username: string;
    avatar: string | null;
}
