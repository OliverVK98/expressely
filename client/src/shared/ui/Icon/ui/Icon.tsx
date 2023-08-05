import React, { memo } from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

type SvgProps = Omit<React.SVGProps<SVGSVGElement>, 'onClick'>;
type FillProps = 'fill' | 'noFill';
type ColorProps = 'color' | 'noColor';

interface IconBaseProps extends SvgProps {
    className?: string;
    Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
    fill?: FillProps;
    color?: ColorProps;
    isGreen?: boolean;
}

interface NonClickableIconProps extends IconBaseProps {
    clickable?: false;
}

interface ClickableBaseProps extends IconBaseProps {
    clickable: true;
    onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableBaseProps;

export const Icon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        width = 32,
        height = 32,
        clickable,
        fill = 'fill',
        color = 'color',
        isGreen = false,
        ...otherProps
    } = props;

    const mods: Mods = {
        [cls.isGreen]: isGreen,
    };

    const icon = (
        <Svg
            className={
                clickable
                    ? classNames(cls.Icon, {}, [cls[fill], cls[color]])
                    : classNames(cls.Icon, {}, [
                          className,
                          cls[fill],
                          cls[color],
                      ])
            }
            width={width}
            height={height}
            {...otherProps}
            onClick={undefined}
        />
    );

    if (clickable) {
        return (
            <button
                type="button"
                className={classNames(cls.button, mods, [
                    className,
                    cls[fill],
                    cls[color],
                ])}
                onClick={props.onClick}
                style={{ height, width }}
            >
                {icon}
            </button>
        );
    }

    return icon;
});
