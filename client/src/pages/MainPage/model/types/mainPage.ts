import { ArticleFeedType } from '@/entities/Article';

export interface MainPageSchema {
    isLoading?: boolean;
    error?: string;
    feedType: ArticleFeedType;
}
