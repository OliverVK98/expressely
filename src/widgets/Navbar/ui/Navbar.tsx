import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink';
import { useTranslation } from 'react-i18next';
import cls from './Navbar.module.scss';

interface NavbarProps {
    className?:string
}

const Navbar = ({ className }: NavbarProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to="/" className={cls.mainLink}>
                    {
                        t('Home Page')
                    }
                </AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to="/about">
                    {
                        t('About Page')
                    }
                </AppLink>
            </div>
        </div>
    );
};

export default Navbar;
