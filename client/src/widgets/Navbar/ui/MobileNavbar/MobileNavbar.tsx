import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';
import cls from './MobileNavbar.module.scss';
import { SignUpForm } from '@/features/createNewUser';
import { HStack, VStack } from '@/shared/ui/Stack';
import { LoginForm } from '@/features/authByEmail';
import { Button } from '@/shared/ui/Button';
import { getSidebarItems } from '../../../Sidebar/model/selectors/getSidebarItems';
import { NotificationButton } from '@/features/notificationButton';
import { ThemeSwitcher } from '@/features/themeSwitcher';
import { LangSwitcher } from '@/features/langSwitcher';
import { getUserAuthData, isUserAdmin, userActions } from '@/entities/User';
import { DropdownItem } from '@/shared/ui/Popups';
import { getRouteAdmin } from '@/shared/const/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import BurgerIcon from '@/shared/assets/icons/burger.svg';

interface MobileNavbarProps {
    className?: string;
    isMobileOpen: boolean;
    setIsMobileOpen: () => void;
}

export const MobileNavbar = (props: MobileNavbarProps) => {
    const { className, setIsMobileOpen, isMobileOpen } = props;
    const { t } = useTranslation();
    const [isSignInFormOpen, setIsSignInFormOpen] = useState(false);
    const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(isUserAdmin);
    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
        setIsMobileOpen();
    }, [dispatch]);

    const onSignInClickHandler = useCallback(() => {
        setIsSignInFormOpen((prev) => !prev);
    }, []);

    const onSignUpClickHandler = useCallback(() => {
        setIsSignUpFormOpen((prev) => !prev);
    }, []);

    const handleNavigateClick = useCallback(
        (url: string) => {
            navigate(url);
            setIsMobileOpen();
        },
        [navigate, setIsMobileOpen],
    );

    const authItems: DropdownItem[] = [
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
            content: t('Logout'),
            onClick: onLogout,
        },
    ];

    return (
        <>
            <Icon
                height={50}
                width={50}
                clickable
                onClick={setIsMobileOpen}
                Svg={BurgerIcon}
            />
            <Drawer
                className={className}
                isOpen={isMobileOpen}
                onClose={setIsMobileOpen}
            >
                {!isSignInFormOpen && !isSignUpFormOpen && (
                    <VStack max gap="32">
                        <VStack max gap="16">
                            {sidebarItemsList.map((item) => (
                                <Button
                                    key={item.text}
                                    onClick={() =>
                                        handleNavigateClick(item.path)
                                    }
                                    className={cls.button}
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </VStack>
                        {authData && (
                            <VStack
                                max
                                gap="16"
                                className={cls.authButtonsContainer}
                            >
                                {authItems.map((item, index) => (
                                    <Button
                                        className={cls.button}
                                        key={index}
                                        onClick={
                                            item.href
                                                ? () =>
                                                      handleNavigateClick(
                                                          item.href!,
                                                      )
                                                : item.onClick
                                        }
                                    >
                                        {item.content}
                                    </Button>
                                ))}
                            </VStack>
                        )}
                        {!authData && (
                            <VStack
                                max
                                gap="16"
                                className={cls.authButtonsContainer}
                            >
                                <Button
                                    className={cls.button}
                                    onClick={onSignInClickHandler}
                                >
                                    {t('Sign In')}
                                </Button>
                                <Button
                                    className={cls.button}
                                    onClick={onSignUpClickHandler}
                                >
                                    {t('Sign Up')}
                                </Button>
                            </VStack>
                        )}
                        <HStack max gap="8" justify="center" align="center">
                            <NotificationButton />
                            <ThemeSwitcher />
                            <LangSwitcher />
                        </HStack>
                    </VStack>
                )}
                {isSignUpFormOpen && (
                    <VStack max gap="16">
                        <SignUpForm
                            className={cls.widthMax}
                            onSuccess={onSignUpClickHandler}
                            isMobile
                        />
                        <Button
                            className={cls.button}
                            onClick={onSignUpClickHandler}
                            color="error"
                        >
                            {t('Go Back')}
                        </Button>
                    </VStack>
                )}
                {isSignInFormOpen && (
                    <VStack max gap="16">
                        <LoginForm
                            onSuccess={onSignInClickHandler}
                            className={cls.widthMax}
                        />
                        <Button
                            className={cls.button}
                            onClick={onSignInClickHandler}
                            color="error"
                        >
                            {t('Go Back')}
                        </Button>
                    </VStack>
                )}
            </Drawer>
        </>
    );
};
