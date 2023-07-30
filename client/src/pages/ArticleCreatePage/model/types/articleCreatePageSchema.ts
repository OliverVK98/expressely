import { ArticleBlock, ArticleType } from '@/entities/Article';

export interface ArticleCreatePageSchema {
    title: string;
    subtitle?: string;
    img: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
    isLoading?: boolean;
    error?: string;
}
