import React from 'react';
import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Navbar.module.scss"
import {AppLink, AppLinkTheme} from "shared/ui/AppLink";

interface NavbarProps {
    className?:string
}

const Navbar = ({className}: NavbarProps) => {
    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={"/"} className={cls.mainLink}>Home Page</AppLink>
                <AppLink theme={AppLinkTheme.SECONDARY} to={"/about"}>About Page</AppLink>
            </div>
        </div>
    );
};

export default Navbar;
