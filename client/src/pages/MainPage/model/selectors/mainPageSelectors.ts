import { buildSelector } from '@/shared/lib/store';
import { ArticleFeedType } from '@/entities/Article';

export const [useMainPageFeedType] = buildSelector(
    (state) => state.mainPage?.feedType || ArticleFeedType.ALL,
);
