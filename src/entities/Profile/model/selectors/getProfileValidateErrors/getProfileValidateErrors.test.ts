import { getProfileValidateErrors, ValidateProfileError } from 'entities/Profile';
import { StateSchema } from 'app/providers/StoreProvider';

describe('getProfileValidateErrors.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateSchema> = {
            profile: {
                validateErrors: [
                    ValidateProfileError.INCORRECT_USER_DATA,
                    ValidateProfileError.INCORRECT_COUNTRY,
                ],
            },
        };
        expect(getProfileValidateErrors(state as StateSchema)).toEqual([
            ValidateProfileError.INCORRECT_USER_DATA,
            ValidateProfileError.INCORRECT_COUNTRY,
        ]);
    });

    test('working with empty state', () => {
        const state: DeepPartial<StateSchema> = {};
        expect(getProfileValidateErrors(state as StateSchema)).toEqual(undefined);
    });
});
