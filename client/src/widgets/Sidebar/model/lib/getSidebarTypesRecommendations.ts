import ReactIcon from '@/shared/assets/icons/react.svg';
import ProgrammingIcon from '@/shared/assets/icons/programming.svg';
import JavascriptIcon from '@/shared/assets/icons/js.svg';
import MathIcon from '@/shared/assets/icons/math.svg';
import { getRouteArticles } from '@/shared/const/router';
import { UserArticleType } from '@/entities/Article';
import { SidebarItemType } from '../types/sidebar';

const articlesPath = (type: UserArticleType) =>
    `${getRouteArticles()}?sort=createdAt&order=asc&search=&type=${type}`;
export const getSidebarTypesRecommendations = (): SidebarItemType[] => [
    {
        path: articlesPath(UserArticleType.Programming),
        Icon: ProgrammingIcon,
        text: 'Programming',
    },
    {
        path: articlesPath(UserArticleType.Javascript),
        Icon: JavascriptIcon,
        text: 'Javascript',
    },
    {
        path: articlesPath(UserArticleType.React),
        Icon: ReactIcon,
        text: 'React',
    },
    {
        path: articlesPath(UserArticleType.Math),
        Icon: MathIcon,
        text: 'Math',
    },
];
