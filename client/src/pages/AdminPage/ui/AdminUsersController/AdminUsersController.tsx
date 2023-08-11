import { memo, useCallback, useMemo } from 'react';
import {
    useGetUserList,
    useUpdateUserRole,
} from '../../model/api/adminPageArticles';
import { VStack } from '@/shared/ui/Stack';
import { UserListBoxItem, UserRole, UserRoleController } from '@/entities/User';

interface AdminUsersControllerProps {
    className?: string;
}

export const AdminUsersController = memo((props: AdminUsersControllerProps) => {
    const { className } = props;
    const { data, error, isLoading, refetch } = useGetUserList();
    const [updateUserRole] = useUpdateUserRole();

    const onUserRoleUpdateHandler = useCallback(
        async (userId: number, role: UserRole) => {
            await updateUserRole({
                role,
                userId,
            });
            refetch();
        },
        [updateUserRole, refetch],
    );

    const items = useMemo(
        (): UserListBoxItem[] => [
            {
                value: UserRole.USER,
                content: UserRole.USER,
            },
            {
                value: UserRole.ADMIN,
                content: UserRole.ADMIN,
            },
        ],
        [],
    );

    return (
        <VStack max gap="4" className={className}>
            {data?.map((user) => (
                <UserRoleController
                    isLoading={isLoading}
                    items={items}
                    updateUserRole={onUserRoleUpdateHandler}
                    user={user}
                    key={user.id}
                />
            ))}
        </VStack>
    );
});
