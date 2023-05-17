import { classNames } from 'shared/lib/classNames/classNames';
import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { DropdownDirection } from 'shared/types/ui';
import { AppLink } from 'shared/ui/AppLink';
import cls from './Dropdown.module.scss';

export interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownProps {
    className?: string;
    items: DropdownItem[];
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export const Dropdown = memo((props: DropdownProps) => {
    const { className, trigger, items, direction = 'bottomRight' } = props;

    const optionsClasses = [cls[direction]];

    return (
        <Menu as="div" className={classNames(cls.Dropdown, {}, [className])}>
            <Menu.Button className={cls.btn}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, optionsClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                            disabled={item.disabled}
                        >
                            {item.content}
                        </button>
                    );

                    if (item.href) {
                        return (
                            <Menu.Item key={index} as={AppLink} to={item.href}>
                                {content}
                            </Menu.Item>
                        );
                    }

                    return (
                        <Menu.Item key={index} as={Fragment}>
                            {content}
                        </Menu.Item>
                    );
                })}
            </Menu.Items>
        </Menu>
    );
});
