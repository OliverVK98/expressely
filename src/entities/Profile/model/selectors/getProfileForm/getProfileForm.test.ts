import { getProfileForm } from 'entities/Profile';
import { StateSchema } from 'app/providers/StoreProvider';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

const data = {
    age: 22,
    country: Country.USA,
    firstname: 'Oliver',
    lastname: 'Kezik',
    currency: Currency.USD,
    avatar: 'https://cdn0.iconfinder.com/data/icons/business-and-it-person/512/person7-512.png',
    username: 'admin',
    city: 'Miami',
};

describe('getProfileForm.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: { form: data },
        };
        expect(getProfileForm(state as StateSchema)).toEqual(data);
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileForm(state as StateSchema)).toEqual(undefined);
    });
});
