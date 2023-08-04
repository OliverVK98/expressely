import { buildSelector } from '@/shared/lib/store';
import { ArticleFeedType } from '@/entities/Article';
import { StateSchema } from '@/app/providers/StoreProvider';

export const getMainPageFeedType = (state: StateSchema) =>
    state.mainPage?.feedType || ArticleFeedType.RECENT;

export const [useMainPageFeedType] = buildSelector(
    (state) => state.mainPage?.feedType || ArticleFeedType.RECENT,
);
