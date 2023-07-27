import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppLogo } from '@/shared/ui/AppLogo';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './Sidebar.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { ThemeSwitcher } from '@/features/themeSwitcher';
import { LangSwitcher } from '@/features/langSwitcher';
import { getSidebarTypesRecommendations } from '../../model/lib/getSidebarTypesRecommendations';
import { SidebarType } from '../SidebarType/SidebarType';
import { Text } from '@/shared/ui/Text';
import { getUserAuthData } from '@/entities/User';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(true);
    const sidebarItemsList = useSelector(getSidebarItems);
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);

    const itemsList = useMemo(
        () =>
            sidebarItemsList.map((item) => (
                <SidebarItem
                    collapsed={collapsed}
                    item={item}
                    key={item.path}
                />
            )),
        [collapsed, sidebarItemsList, authData],
    );

    const typesList = useMemo(
        () =>
            getSidebarTypesRecommendations().map((item) => (
                <SidebarType
                    collapsed={collapsed}
                    item={item}
                    key={item.path}
                />
            )),
        [collapsed],
    );

    return (
        <aside
            onMouseEnter={() => setCollapsed(false)}
            onMouseLeave={() => setCollapsed(true)}
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
            {/* <Icon */}
            {/*     Svg={ArrowIcon} */}
            {/*     data-testid="sidebar-toggle" */}
            {/*     onClick={onToggle} */}
            {/*     className={cls.collapseBtn} */}
            {/*     clickable */}
            {/* /> */}
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
            </div>
            <VStack role="navigation" gap="8" className={cls.items}>
                {itemsList}
            </VStack>
            <VStack role="navigation" gap="8" className={cls.types}>
                {!collapsed && (
                    <Text className={cls.text} text={t('Popular: ')} />
                )}
                {typesList}
            </VStack>
        </aside>
    );
});
