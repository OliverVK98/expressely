import { getRouteArticles } from '@/shared/const/router';
import {
    getIconForType,
    getTitleForType,
    UserArticleType,
} from '@/entities/Article';
import { SidebarItemType } from '../types/sidebar';

const articlesPath = (type: UserArticleType) =>
    `${getRouteArticles()}?sort=createdAt&order=asc&search=&type=${type}`;
export const getSidebarTypesRecommendations = (): SidebarItemType[] => [
    {
        path: articlesPath(UserArticleType.Programming),
        Icon: getIconForType(UserArticleType.Programming),
        text: getTitleForType(UserArticleType.Programming),
    },
    {
        path: articlesPath(UserArticleType.Javascript),
        Icon: getIconForType(UserArticleType.Javascript),
        text: getTitleForType(UserArticleType.Javascript),
    },
    {
        path: articlesPath(UserArticleType.Java),
        Icon: getIconForType(UserArticleType.Java),
        text: getTitleForType(UserArticleType.Java),
    },
    {
        path: articlesPath(UserArticleType.Go),
        Icon: getIconForType(UserArticleType.Go),
        text: getTitleForType(UserArticleType.Go),
    },
    {
        path: articlesPath(UserArticleType.Python),
        Icon: getIconForType(UserArticleType.Python),
        text: getTitleForType(UserArticleType.Python),
    },
];
