import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';

export interface FormValues {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    firstname: string;
    lastname: string;
    age: number;
    country: Country;
    currency: Currency;
    city: string;
}
