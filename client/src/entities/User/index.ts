import {
    isUserAdmin,
    getUserRoles,
} from './model/selectors/getUserRoles/roleSelector';
import { UserRole } from './model/consts/consts';
import { userReducer, userActions } from './model/slice/userSlice';
import {
    UserSchema,
    User,
    ServerUserResponse,
    CreateUserDto,
    UserListBoxItem,
} from './model/types/userSchema';
import { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
import { getUserInit } from './model/selectors/getUserInit/getUserInit';
import { useJsonSettings } from './model/selectors/getUserJsonSettings/getUserJsonSettings';
import { saveJsonSettings } from './model/services/saveJsonSettings';
import { initAuthData } from './model/services/initAuthData';
import { updateUserPreferences } from './model/services/updateUserPreferences';
import { UserRoleController } from './ui/UserRoleController/UserRoleController';

export {
    userActions,
    userReducer,
    type User,
    type UserSchema,
    type ServerUserResponse,
    type CreateUserDto,
    type UserListBoxItem,
    getUserAuthData,
    getUserInit,
    isUserAdmin,
    UserRole,
    getUserRoles,
    useJsonSettings,
    saveJsonSettings,
    initAuthData,
    updateUserPreferences,
    UserRoleController,
};
