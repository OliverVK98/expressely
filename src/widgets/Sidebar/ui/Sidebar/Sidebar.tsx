import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { AppLogo } from '@/shared/ui/AppLogo';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';
import { VStack } from '@/shared/ui/Stack';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { Icon } from '@/shared/ui/Icon';
import { ThemeSwitcher } from '@/features/themeSwitcher';
import { LangSwitcher } from '@/features/langSwitcher';

interface SidebarProps {
    className?: string;
}

// TODO: Decompose into smaller components
const DeprecatedSidebar = () => {};

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();
    const sidebarItemsList = useSelector(getSidebarItems);

    const onToggle = () => {
        setCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    collapsed={collapsed}
                    item={item}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList],
    );

    return (
        <aside
            data-testid="sidebar"
            className={classNames(
                cls.Sidebar,
                {
                    [cls.collapsed]: collapsed,
                },
                [className],
            )}
        >
            <AppLogo size={collapsed ? 32 : 50} className={cls.appLogo} />
            <Icon
                Svg={ArrowIcon}
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                clickable
            />
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
        </aside>
    );
});
