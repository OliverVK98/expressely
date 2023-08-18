import { CSSProperties, useMemo } from 'react';
import UserIcon from '@/shared/assets/icons/avatar.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../../AppImage';
import { Icon } from '../../Icon';
import { Skeleton } from '../../Skeleton';
import { TestProps } from '@/shared/types/tests';

interface AvatarProps extends TestProps {
    className?: string;
    src?: string | null;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const { className, src, size = 100, alt, ...otherProps } = props;

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size,
            height: size,
        }),
        [size],
    );

    const fallback = <Skeleton width={size} height={size} border="50%" />;
    const errorFallback = <Icon width={size} height={size} Svg={UserIcon} />;

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src === null ? '' : src}
            style={styles}
            alt={alt}
            className={classNames(cls.Avatar, {}, [className])}
            {...otherProps}
        />
    );
};
