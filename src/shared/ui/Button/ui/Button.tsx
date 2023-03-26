import {classNames} from "shared/lib/classNames/classNames";
import cls from "./Button.module.scss"
import React, {ButtonHTMLAttributes, FC} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    className?:string,
    children: React.ReactNode,
    theme?:ThemeButton
}

export enum ThemeButton {
    CLEAR = "clear"
}

export const Button: FC<ButtonProps> = (props) => {
    const {className, children, theme, ...otherProps} = props

    return (
        <button
            {...otherProps}
            className={classNames(cls.Button, {}, [className, cls[theme]])}
        >
            {
                children
            }
        </button>
    );
};
