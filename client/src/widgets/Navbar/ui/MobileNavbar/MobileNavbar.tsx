import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Drawer } from '@/shared/ui/Drawer';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { Icon } from '@/shared/ui/Icon';
import cls from './MobileNavbar.module.scss';
import { SignUpForm } from '@/features/createNewUser';
import { VStack } from '@/shared/ui/Stack';
import { LoginForm } from '@/features/authByEmail';
import { Button } from '@/shared/ui/Button';
import { getSidebarItems } from '../../../Sidebar/model/selectors/getSidebarItems';

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

    return (
        <>
            <Icon
                height={25}
                width={25}
                clickable
                onClick={setIsMobileOpen}
                Svg={ProfileIcon}
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
