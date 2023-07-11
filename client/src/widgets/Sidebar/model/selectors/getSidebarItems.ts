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
    getRouteProfile,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
    const sidebarItemsList: SidebarItemType[] = [
        {
            path: getRouteMain(),
            Icon: HomeIcon,
            text: 'Home Page',
        },
        {
            path: getRouteAbout(),
            Icon: InfoIcon,
            text: 'About Page',
        },
        {
            path: getRouteArticles(),
            Icon: ArticlesIcon,
            text: 'Articles Page',
        },
    ];

    if (userData) {
        sidebarItemsList.push(
            {
                path: getRouteProfile(userData.id),
                Icon: ProfileIcon,
                text: 'Profile Page',
                authOnly: true,
            },
            {
                path: getRouteArticleCreate(),
                Icon: AddIcon,
                text: 'Create New Article',
                authOnly: true,
            },
        );
    }

    return sidebarItemsList;
});
