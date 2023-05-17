import { loginActions } from './loginSlice';
import { loginReducer, LoginSchema } from '../..';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            username: 'testUser',
        };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setUsername('newTest'),
        )).toEqual({ username: 'newTest' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: 'testPass',
        };
        expect(loginReducer(
            state as LoginSchema,
            loginActions.setPassword('newPass'),
        )).toEqual({ password: 'newPass' });
    });
});
