import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './BlockPositionSwitchers.module.scss';
import { VStack } from '@/shared/ui/Stack';
import CircleIcon from '@/shared/assets/icons/circle-up.svg';
import { Icon } from '@/shared/ui/Icon';

interface BlockPositionSwitchersProps {
    className?: string;
    onClickUp: () => void;
    onClickDown: () => void;
}

export const BlockPositionSwitchers = memo(
    (props: BlockPositionSwitchersProps) => {
        const { className, onClickUp, onClickDown } = props;

        return (
            <VStack
                className={classNames(cls.BlockPositionSwitchers, {}, [
                    className,
                ])}
                max
                gap="32"
            >
                <Icon
                    Svg={CircleIcon}
                    clickable
                    onClick={onClickUp}
                    width={25}
                    height={25}
                    className={cls.scrollUp}
                />
                <Icon
                    Svg={CircleIcon}
                    clickable
                    onClick={onClickDown}
                    width={25}
                    height={25}
                    className={cls.scrollDown}
                />
            </VStack>
        );
    },
);
