import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { User, UserListBoxItem } from '../../model/types/userSchema';
import { Card } from '@/shared/ui/Card';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { ListBox } from '@/shared/ui/Popups';
import { getUserHighestRole } from '../../model/lib/getUserHighestRole';
import { UserRole } from '../../model/consts/consts';
import { Avatar } from '@/shared/ui/Avatar';
import { Skeleton } from '@/shared/ui/Skeleton';

interface UserRoleControllerProps {
    className?: string;
    user?: User;
    isLoading: boolean;
    items: UserListBoxItem[];
    updateUserRole: (userId: number, role: UserRole) => void;
}

export const UserRoleController = memo((props: UserRoleControllerProps) => {
    const { className, user, isLoading, items, updateUserRole } = props;
    const { t } = useTranslation();

    const onUserRoleChangeHandler = useCallback(
        async (role: UserRole) => {
            updateUserRole(user?.id as number, role);
        },
        [updateUserRole, user?.id],
    );

    if (isLoading) return <Skeleton height="50" width="max" />;

    return (
        <Card max padding="8" className={className}>
            <HStack max justify="between">
                <HStack gap="8">
                    <Avatar size={32} src={user?.avatar} />
                    <Text text={t(`Username: ${user?.username}`)} />
                </HStack>
                <HStack gap="16">
                    <Text text={t('Current user role:')} />
                    <ListBox
                        onChange={onUserRoleChangeHandler}
                        items={items}
                        direction="bottomRight"
                        value={getUserHighestRole(user?.roles)}
                    />
                </HStack>
            </HStack>
        </Card>
    );
});
