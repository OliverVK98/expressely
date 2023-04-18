import { getProfileReadonly } from 'entities/Profile';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getProfileIsLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: { readonly: true },
        };
        expect(getProfileReadonly(state as StateSchema)).toEqual(true);
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileReadonly(state as StateSchema)).toEqual(undefined);
    });
});
