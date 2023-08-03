import { ProfilePageAsync } from './ui/ProfilePage/ProfilePage.async';
import { ProfileSchema } from './model/types/editableProfileCardSchema';
import { profileReducer } from './model/slice/profileSlice';

export { ProfilePageAsync as ProfilePage, type ProfileSchema, profileReducer };
