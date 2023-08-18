import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown, DropdownItem } from '@/shared/ui/Popups';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { getRouteAdmin, getRouteUserProfile } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (!authData) {
        return null;
    }

    const items: DropdownItem[] = [
        ...(isAdmin
            ? [
                  {
                      content: t('Admin Panel'),
                      href: getRouteAdmin(),
                      'data-testid': 'AvatarDropdown.AdminPage',
                  },
              ]
            : []),
        {
            content: t('Profile'),
            href: getRouteUserProfile(),
        },
        {
            content: t('Logout'),
            onClick: onLogout,
        },
    ];

    return (
        <Dropdown
            className={className}
            direction="bottomLeft"
            items={items}
            trigger={
                <Avatar
                    data-testid="avatarDropdown"
                    size={40}
                    src={authData.avatar}
                />
            }
        />
    );
});
