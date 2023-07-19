import { TestAsyncThunk } from '@/shared/config/tests/TestAyncThunk/TestAsyncThunk';
import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { fetchAuthProfileData } from './fetchAuthProfileData';

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

describe('fetchAuthProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(fetchAuthProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk(1);

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(fetchAuthProfileData);
        thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk(1);

        expect(thunk.api.get).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('rejected');
    });
});
