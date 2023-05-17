import React, { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserAuthData,
    isUserAdmin,
    isUserManager,
    userActions,
} from 'entities/User';
import { Text, TextTheme } from 'shared/ui/Text';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { LoginModal } from 'features/authByUsername';
import { Dropdown } from 'shared/ui/Dropdown';
import { Avatar } from 'shared/ui/Avatar';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);

    const onCloseModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvailable = isAdmin || isManager;

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    theme={TextTheme.INVERTED}
                    className={cls.appName}
                    title={t('TEST WEBPACK APP')}
                />
                <AppLink
                    theme={AppLinkTheme.SECONDARY}
                    to={RoutePath.article_create}
                    className={cls.createBtn}
                >
                    {t('Create new article')}
                </AppLink>
                <Dropdown
                    direction="bottomLeft"
                    className={cls.dropdown}
                    items={[
                        ...(isAdminPanelAvailable
                            ? [
                                  {
                                      content: t('Admin Page'),
                                      href: RoutePath.admin_panel,
                                  },
                              ]
                            : []),
                        {
                            content: t('Logout'),
                            onClick: onLogout,
                        },
                        {
                            content: t('Profile'),
                            href: RoutePath.profile + authData.id,
                        },
                    ]}
                    trigger={<Avatar size={30} src={authData.avatar} />}
                />
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={onShowModal}
            >
                {t('Sign In')}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    );
});

export default Navbar;
