import { loginActions, loginReducer } from './loginSlice';
import { LoginSchema } from '../../model/types/loginSchema';

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<LoginSchema> = {
            email: 'testUser',
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setEmail('newTest'),
            ),
        ).toEqual({ username: 'newTest' });
    });

    test('test set password', () => {
        const state: DeepPartial<LoginSchema> = {
            password: 'testPass',
        };
        expect(
            loginReducer(
                state as LoginSchema,
                loginActions.setPassword('newPass'),
            ),
        ).toEqual({ password: 'newPass' });
    });
});
