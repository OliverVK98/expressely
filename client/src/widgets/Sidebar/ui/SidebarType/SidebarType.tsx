import { useTranslation } from 'react-i18next';
import React from 'react';
import { AppLink } from '@/shared/ui/AppLink';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarType.module.scss';
import { Icon } from '@/shared/ui/Icon';

interface SidebarTypeProps {
    item: SidebarItemType;
    collapsed: boolean;
}

export const SidebarType = ({ item, collapsed }: SidebarTypeProps) => {
    const { t } = useTranslation();

    return (
        <AppLink
            variant="primary"
            to={item.path}
            target="_blank"
            className={classNames(cls.item, {
                [cls.collapsed]: collapsed,
            })}
        >
            <Icon height={30} width={30} Svg={item.Icon} />
            <span className={cls.link}>{t(item.text)}</span>
        </AppLink>
    );
};
