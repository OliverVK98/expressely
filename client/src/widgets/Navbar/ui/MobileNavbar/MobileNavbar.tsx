import { useTranslation } from 'react-i18next';
import React from 'react';
import { Drawer } from '@/shared/ui/Drawer';
import ProfileIcon from '@/shared/assets/icons/profile.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import cls from './MobileNavbar.module.scss';
import { SignUpForm } from '@/features/createNewUser';

interface MobileNavbarProps {
    className?: string;
    isMobileOpen: boolean;
    setIsMobileOpen: () => void;
}

export const MobileNavbar = (props: MobileNavbarProps) => {
    const { className, setIsMobileOpen, isMobileOpen } = props;
    const { t } = useTranslation();

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
                {/* <Button>{t('Sign In')}</Button> */}
                {/* <LoginForm */}
                {/*     onSuccess={() => console.log('asdad')} */}
                {/*     className={cls.widthMax} */}
                {/* /> */}
                <Button>{t('Sign Up')}</Button>
                <SignUpForm
                    className={cls.widthMax}
                    onSuccess={() => console.log('asdad')}
                />
            </Drawer>
        </>
    );
};
