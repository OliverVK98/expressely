import { TestAsyncThunk } from 'shared/config/tests/TestAyncThunk/TestAsyncThunk';
import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { ValidateProfileError } from 'entities/Profile';
import { updateProfileData } from './updateProfileData';

const data = {
    age: 22,
    country: Country.USA,
    firstname: 'Oliver',
    lastname: 'Kezik',
    currency: Currency.USD,
    avatar: 'https://cdn0.iconfinder.com/data/icons/business-and-it-person/512/person7-512.png',
    username: 'admin',
    city: 'Miami',
    id: '1',
};

describe('updateProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ data }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(data);
    });

    test('error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        });
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }));
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.SERVER_ERROR,
        ]);
    });

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, firstname: '' },
            },
        });
        const result = await thunk.callThunk();

        expect(result.meta.requestStatus).toBe('rejected');
        expect(result.payload).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
        ]);
    });
});
