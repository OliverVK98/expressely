import { ArticleExpandedUser } from '@/entities/Article';

export interface ArticleEditPageSchema {
    article: ArticleExpandedUser;
    isLoading: boolean;
    error?: string;
}
