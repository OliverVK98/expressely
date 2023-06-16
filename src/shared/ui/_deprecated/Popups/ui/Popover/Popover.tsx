import { memo, ReactNode } from 'react';
import { Popover as HeadlessPopover } from '@headlessui/react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirection } from '@/shared/types/ui';
import { mapDirectionClass } from '../../sharedStyles/consts';
import cls from './Popover.module.scss';
import popupCls from '../../sharedStyles/popup.module.scss';

interface PopoverProps {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
    children: ReactNode;
}
/**
 * Old component for the initial site design
 * @deprecated
 */
export const Popover = memo((props: PopoverProps) => {
    const { className, trigger, direction = 'bottomRight', children } = props;
    const menuClasses = [mapDirectionClass[direction]];

    return (
        <HeadlessPopover
            className={classNames(cls.Popover, {}, [className, popupCls.popup])}
        >
            <HeadlessPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HeadlessPopover.Button>

            <HeadlessPopover.Panel
                className={classNames(cls.panel, {}, menuClasses)}
            >
                {children}
            </HeadlessPopover.Panel>
        </HeadlessPopover>
    );
});
