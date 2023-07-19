import {
    EditableProfileFields,
    Profile,
    PublicProfile,
} from '@/entities/Profile';
import { ValidateProfileError } from '../consts/consts';

export interface ProfileSchema {
    data: Profile;
    form: EditableProfileFields;
    publicData: PublicProfile;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateProfileError[];
}
