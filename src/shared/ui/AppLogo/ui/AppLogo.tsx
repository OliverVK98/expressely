import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import AppSvg from '@/shared/assets/icons/default-logo.svg';
import { HStack } from '../../Stack';
import cls from './AppLogo.module.scss';

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
            <AppSvg
                width={size}
                height={size}
                className={cls.appLogo}
                color="black"
            />
            <div className={cls.gradientBig} />
            <div className={cls.gradientSmall} />
        </HStack>
    );
});
