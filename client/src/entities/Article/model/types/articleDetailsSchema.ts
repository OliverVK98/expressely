import { ArticleExpandedUser } from '../../model/types/article';

export interface ArticleDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: ArticleExpandedUser;
}
