import { StateSchema } from 'app/providers/StoreProvider';
import {
    getProfileValidateErrors,
} from 'features/editableProfileCard/model/selectors/getProfileValidateErrors/getProfileValidateErrors';
import { ValidateProfileError } from 'features/editableProfileCard';

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
