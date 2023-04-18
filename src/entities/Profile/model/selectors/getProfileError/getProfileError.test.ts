import { getProfileError } from 'entities/Profile';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getProfileError.test', () => {
    test('should return data', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                error: '123',
            },
        };
        expect(getProfileError(state as StateSchema)).toEqual('123');
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileError(state as StateSchema)).toEqual(undefined);
    });
});
