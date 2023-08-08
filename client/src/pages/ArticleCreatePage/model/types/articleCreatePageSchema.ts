import { ArticleBlock, UserArticleType } from '@/entities/Article';

export interface ArticleCreatePageSchema {
    title: string;
    subtitle?: string;
    img: string;
    type: UserArticleType[];
    blocks: ArticleBlock[];
    isLoading?: boolean;
    error?: string;
}
