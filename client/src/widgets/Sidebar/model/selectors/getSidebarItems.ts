import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import HomeIcon from '@/shared/assets/icons/home.svg';
import InfoIcon from '@/shared/assets/icons/info.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticlesIcon from '@/shared/assets/icons/article.svg';
import AddIcon from '@/shared/assets/icons/add.svg';

import { SidebarItemType } from '../types/sidebar';
import {
    getRouteAbout,
    getRouteArticleCreate,
    getRouteArticles,
    getRouteMain,
    getRouteUserProfile,
} from '@/shared/const/router';
import i18n from '@/shared/config/i18n/i18n';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: HomeIcon,
            text: i18n.t('Home'),
        },
        {
            path: getRouteAbout(),
            Icon: InfoIcon,
            text: i18n.t('About'),
        },
        {
            path: getRouteArticles(),
            Icon: ArticlesIcon,
            text: i18n.t('Articles'),
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteUserProfile(),
                Icon: ProfileIcon,
                text: i18n.t('Profile'),
                authOnly: true,
            },
            {
                path: getRouteArticleCreate(),
                Icon: AddIcon,
                text: i18n.t('Publish Article'),
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
