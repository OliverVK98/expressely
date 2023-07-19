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

export interface PublicProfile {
    firstname: string;
    lastname: string;
    age: number;
    username: string;
    avatar: string;
}

export type EditableProfileFields = Omit<Profile, 'userId'>;

export type UpdateProfileDto = Partial<EditableProfileFields>;
