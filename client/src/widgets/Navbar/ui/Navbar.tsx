import React, { memo, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/authByEmail';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { SignUpModal } from '@/features/createNewUser';

interface NavbarProps {
    className?: string;
}

const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isSignUpModal, setIsSignUpModal] = useState(false);
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        console.log('here?');
    }, [authData]);

    const onToggleAuthModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    const onToggleSignUpModal = useCallback(() => {
        setIsSignUpModal((prev) => !prev);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button
                variant="outline"
                className={cls.links}
                onClick={onToggleAuthModal}
            >
                {t('Sign In')}
            </Button>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onToggleAuthModal} />
            )}
            <Button
                variant="outline"
                className={cls.links}
                onClick={onToggleSignUpModal}
            >
                {t('Sign Up')}
            </Button>
            {isSignUpModal && (
                <SignUpModal
                    isOpen={isSignUpModal}
                    onClose={onToggleSignUpModal}
                />
            )}
        </header>
    );
});

export default Navbar;
