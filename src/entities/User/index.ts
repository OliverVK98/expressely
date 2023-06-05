import {
    isUserManager,
    isUserAdmin,
    getUserRoles,
} from './model/selectors/getUserRoles/roleSelector';
import { UserRole } from './model/consts/consts';
import { userReducer, userActions } from './model/slice/userSlice';
import { UserSchema, User } from './model/types/userSchema';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInit } from './model/selectors/getUserInit/getUserInit';
import { useJsonSettings } from './model/selectors/getUserJsonSettings/getUserJsonSettings';
import { saveJsonSettings } from './model/services/saveJsonSettings';
import { initAuthData } from './model/services/initAuthData';

export {
    userActions,
    userReducer,
    type User,
    type UserSchema,
    getUserAuthData,
    getUserInit,
    isUserManager,
    isUserAdmin,
    UserRole,
    getUserRoles,
    useJsonSettings,
    saveJsonSettings,
    initAuthData,
};
