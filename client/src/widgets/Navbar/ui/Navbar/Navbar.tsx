import React, { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { LoginModal } from '@/features/authByEmail';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getUserAuthData } from '@/entities/User';
import { NotificationButton } from '@/features/notificationButton';
import { AvatarDropdown } from '@/features/avatarDropdown';
import cls from './Navbar.module.scss';
import { SignUpModal } from '@/features/createNewUser';
import { UnauthorizedDropdown } from '@/features/unauthDropdown';
import { BrowserView } from '@/shared/ui/BrowserView';
import { MobileView } from '@/shared/ui/MobileView';
import { MobileNavbar } from '../MobileNavbar/MobileNavbar';

interface NavbarProps {
    className?: string;
}

const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isSignUpModal, setIsSignUpModal] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const authData = useSelector(getUserAuthData);

    const onToggleAuthModal = useCallback(() => {
        setIsAuthModal((prev) => !prev);
    }, []);

    const onToggleSignUpModal = useCallback(() => {
        setIsSignUpModal((prev) => !prev);
    }, []);

    const onMobileToggle = useCallback(() => {
        setIsMobileOpen((prev) => !prev);
    }, []);

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <HStack gap="16" className={cls.actions}>
                    <BrowserView>
                        <NotificationButton />
                        <AvatarDropdown />
                    </BrowserView>
                    <MobileView>
                        <MobileNavbar
                            isMobileOpen={isMobileOpen}
                            setIsMobileOpen={onMobileToggle}
                        />
                    </MobileView>
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onToggleAuthModal} />
            )}
            <BrowserView>
                <UnauthorizedDropdown
                    onToggleAuthModal={onToggleAuthModal}
                    onToggleSignUpModal={onToggleSignUpModal}
                />
            </BrowserView>
            <MobileView>
                <MobileNavbar
                    isMobileOpen={isMobileOpen}
                    setIsMobileOpen={onMobileToggle}
                />
            </MobileView>
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
