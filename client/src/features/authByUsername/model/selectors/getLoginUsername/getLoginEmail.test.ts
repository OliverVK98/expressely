import { StateSchema } from '@/app/providers/StoreProvider';
import { getLoginEmail } from './getLoginEmail';

describe('getLoginEmail.test', () => {
    test('should return login', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                email: 'test',
            },
        };
        expect(getLoginEmail(state as StateSchema)).toEqual('test');
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginEmail(state as StateSchema)).toEqual('');
    });
});
