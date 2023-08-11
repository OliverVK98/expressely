import { UserRole } from '../../model/consts/consts';

export const getUserHighestRole = (roles?: UserRole[]): UserRole => {
    if (roles?.includes(UserRole.ADMIN)) {
        return UserRole.ADMIN;
    }

    return UserRole.USER;
};
