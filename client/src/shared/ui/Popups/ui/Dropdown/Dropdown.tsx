import { Fragment, memo, ReactNode } from 'react';
import { Menu } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink';
import { mapDirectionClass } from '../../sharedStyles/consts';
import cls from './Dropdown.module.scss';
import popupCls from '../../sharedStyles/popup.module.scss';
import { TestProps } from '@/shared/types/tests';

export interface SelectOption<T extends string> {
    value: T;
    content: string;
}

export interface DropdownItem extends TestProps {
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

    const menuClasses = [mapDirectionClass[direction], popupCls.menu];

    return (
        <Menu
            as="div"
            className={classNames(cls.Dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>

            <Menu.Items
                as="div"
                className={classNames(cls.menu, {}, menuClasses)}
            >
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [cls.active]: active,
                            })}
                            data-testid={item['data-testid']}
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
