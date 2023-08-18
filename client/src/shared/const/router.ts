export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    USER_PROFILE = 'profile',
    PROFILE = 'profiles',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    ADMIN_ARTICLE_APPROVE = 'admin_article_approve',
    FORBIDDEN_PAGE = 'forbidden',
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => '/';
export const getRouteAbout = () => '/about';
export const getRouteUserProfile = () => `/profile`;
export const getRouteProfile = (id: string | number) => `/profiles/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleDetails = (id: string | number) =>
    `/articles/${id}`;
export const getRouteArticleCreate = () => '/new-article';
export const getRouteArticleEdit = (id: string | number) =>
    `/edit-article/${id}`;
export const getRouteAdmin = () => `/admin`;
export const getRouteArticlePreview = (id: string | number) =>
    `/admin/article/${id}`;
export const getRouteForbidden = () => `/forbidden`;

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
    [getRouteMain()]: AppRoutes.MAIN,
    [getRouteAbout()]: AppRoutes.ABOUT,
    [getRouteUserProfile()]: AppRoutes.USER_PROFILE,
    [getRouteProfile(':id')]: AppRoutes.PROFILE,
    [getRouteArticles()]: AppRoutes.ARTICLES,
    [getRouteArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
    [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
    [getRouteArticleEdit(':id')]: AppRoutes.ARTICLE_EDIT,
    [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
    [getRouteArticlePreview(':id')]: AppRoutes.ADMIN_PANEL,
    [getRouteForbidden()]: AppRoutes.FORBIDDEN_PAGE,
};
