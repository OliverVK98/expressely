import { ArticleBlock, ArticleType } from '@/entities/Article';

export interface ArticleCreatePageSchema {
    title: string;
    subtitle?: string;
    img: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
    isModalOpen: boolean;
    isLoading?: boolean;
    error?: string;
}
