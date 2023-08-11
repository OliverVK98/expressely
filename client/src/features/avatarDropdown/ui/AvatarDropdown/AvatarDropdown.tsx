import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Popups';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import cls from './AvatarDropdown.module.scss';
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

    const items = [
        ...(isAdmin
            ? [
                  {
                      content: t('Admin Panel'),
                      href: getRouteAdmin(),
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
            className={classNames(cls.AvatarDropdown, {}, [className])}
            direction="bottomLeft"
            items={items}
            trigger={<Avatar size={40} src={authData.avatar} />}
        />
    );
});
