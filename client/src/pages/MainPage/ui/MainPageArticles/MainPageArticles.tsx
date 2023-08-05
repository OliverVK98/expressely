import { memo } from 'react';
import { ArticleFeedType } from '@/entities/Article';
import { RecentArticles } from '../RecentArticles/RecentArticles';
import { DiscoverArticles } from '../DiscoverArticles/DiscoverArticles';
import { HistoryArticles } from '../HistoryArticles/HistoryArticles';
import { UserArticles } from '../UserArticles/UserArticles';
import { User } from '@/entities/User';

interface MainPageArticlesProps {
    className?: string;
    articlesType: ArticleFeedType;
    authData?: User;
}

export const MainPageArticles = memo((props: MainPageArticlesProps) => {
    const { className, articlesType, authData } = props;

    switch (articlesType) {
        case ArticleFeedType.RECENT:
            return <RecentArticles className={className} />;
        case ArticleFeedType.DISCOVER:
            return authData ? (
                <DiscoverArticles authData={authData} className={className} />
            ) : null;
        case ArticleFeedType.HISTORY:
            return authData ? <HistoryArticles className={className} /> : null;
        case ArticleFeedType.MY_ARTICLES:
            return authData ? <UserArticles className={className} /> : null;
        default:
            return null;
    }
});
