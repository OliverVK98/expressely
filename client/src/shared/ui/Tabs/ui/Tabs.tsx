import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../../Card';
import cls from './Tabs.module.scss';
import { Flex, FlexDirection } from '../../Stack/ui/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
    direction?: FlexDirection;
    max?: boolean;
}

export const Tabs = memo((props: TabsProps) => {
    const {
        className,
        tabs,
        onTabClick,
        value,
        direction = 'row',
        max,
    } = props;

    const clickHandle = useCallback(
        (tab: TabItem) => () => {
            onTabClick(tab);
        },
        [onTabClick],
    );

    return (
        <Flex
            direction={direction}
            gap="8"
            className={classNames(cls.Tabs, {}, [className])}
            align="start"
            max={max}
        >
            {tabs.map((tab) => {
                const isSelected = tab.value === value;

                return (
                    <Card
                        variant={isSelected ? 'light' : 'normal'}
                        className={classNames(cls.tab, {
                            [cls.selected]: isSelected,
                        })}
                        key={tab.value}
                        onClick={clickHandle(tab)}
                        border="default"
                        max={max}
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
});
