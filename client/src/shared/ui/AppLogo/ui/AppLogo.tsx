import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppSvg from '@/shared/assets/icons/applogo.svg';
import { HStack } from '../../Stack';
import cls from './AppLogo.module.scss';
import { Icon } from '../../Icon';

interface AppLogoProps {
    className?: string;
    size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className, size = 50 } = props;

    return (
        <HStack
            max
            justify="center"
            className={classNames(cls.appLogoWrapper, {}, [className])}
        >
            <Icon
                Svg={AppSvg}
                width={size}
                height={size}
                className={cls.appLogo}
            />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
});
