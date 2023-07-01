import { StateSchema } from '@/app/providers/StoreProvider';
import {
    getLoginIsLoading,
} from './getLoginIsLoading';

describe('getLoginIsLoading.test', () => {
    test('should return loading = true', () => {
        const state: DeepPartial<StateSchema> = {
            loginForm: {
                isLoading: true,
            },
        };
        expect(getLoginIsLoading(state as StateSchema)).toEqual(true);
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getLoginIsLoading(state as StateSchema)).toEqual(false);
    });
});
