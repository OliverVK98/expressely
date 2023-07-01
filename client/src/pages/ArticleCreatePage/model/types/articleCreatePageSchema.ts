import { ArticleBlock, ArticleType } from '@/entities/Article';

export interface ArticleServerSchema {
    id: string;
    title: string;
    subtitle?: string;
    img: string;
    views: number;
    createdAt: string;
    userId: string;
    type: ArticleType[];
    blocks: ArticleBlock[];
}

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
