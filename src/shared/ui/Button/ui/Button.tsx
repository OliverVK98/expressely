import React, {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    ReactNode,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';
export type ButtonColor = 'normal' | 'success' | 'error';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    children: React.ReactNode;
    variant?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    'data-testid'?: string;
    fullWidth?: boolean;
    addonLeft?: ReactNode;
    addonRight?: ReactNode;
    color?: ButtonColor;
}

export const Button = forwardRef(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            className,
            children,
            variant = 'outline',
            square,
            size = 'm',
            disabled,
            fullWidth,
            'data-testid': dataTestId = '',
            addonLeft,
            addonRight,
            color = 'normal',
            ...otherProps
        } = props;

        const mods: Mods = {
            [cls.square]: square,
            [cls.disabled]: disabled,
            [cls.fullWidth]: fullWidth,
            [cls.withAddon]: Boolean(addonRight) || Boolean(addonLeft),
        };

        return (
            <button
                {...otherProps}
                type="button"
                className={classNames(cls.Button, mods, [
                    className,
                    cls[variant],
                    cls[size],
                    cls[color],
                ])}
                disabled={disabled}
                data-testid={dataTestId}
                ref={ref}
            >
                <div className={cls.addonLeft}>{addonLeft}</div>
                {children}
                <div className={cls.addonRight}>{addonRight}</div>
            </button>
        );
    },
);
