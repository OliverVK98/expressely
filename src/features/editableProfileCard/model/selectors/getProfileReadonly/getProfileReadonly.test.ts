import { StateSchema } from 'app/providers/StoreProvider';
import {
    getProfileReadonly,
} from 'features/editableProfileCard/model/selectors/getProfileReadonly/getProfileReadonly';

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
