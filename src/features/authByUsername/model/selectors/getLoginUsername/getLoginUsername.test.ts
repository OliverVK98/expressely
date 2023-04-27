import { StateSchema } from 'app/providers/StoreProvider';
import {
    getLoginUsername,
} from 'features/authByUsername/model/selectors/getLoginUsername/getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return login', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                username: 'test',
            },
        };
        expect(getLoginUsername(state as StateSchema)).toEqual('test');
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginUsername(state as StateSchema)).toEqual('');
    });
});
