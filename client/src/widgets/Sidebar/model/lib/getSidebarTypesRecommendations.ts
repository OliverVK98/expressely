import ReactIcon from '@/shared/assets/icons/react.svg';
import ProgrammingIcon from '@/shared/assets/icons/programming.svg';
import JavascriptIcon from '@/shared/assets/icons/js.svg';
import MathIcon from '@/shared/assets/icons/math.svg';
import { getRouteArticles } from '@/shared/const/router';
import { ArticleType } from '@/entities/Article';
import { SidebarItemType } from '../types/sidebar';

const articlesPath = (type: ArticleType) =>
    `${getRouteArticles()}?sort=createdAt&order=asc&search=&type=${type}`;
export const getSidebarTypesRecommendations = (): SidebarItemType[] => [
    {
        path: articlesPath(ArticleType.Programming),
        Icon: ProgrammingIcon,
        text: 'Programming',
    },
    {
        path: articlesPath(ArticleType.Javascript),
        Icon: JavascriptIcon,
        text: 'Javascript',
    },
    {
        path: articlesPath(ArticleType.React),
        Icon: ReactIcon,
        text: 'React',
    },
    {
        path: articlesPath(ArticleType.Math),
        Icon: MathIcon,
        text: 'Math',
    },
];
