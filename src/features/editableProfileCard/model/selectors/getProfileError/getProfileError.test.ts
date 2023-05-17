import { StateSchema } from 'app/providers/StoreProvider';
import {
    getProfileError,
} from 'features/editableProfileCard/model/selectors/getProfileError/getProfileError';

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
