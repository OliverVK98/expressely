import { User } from '@/entities/User';
import { ArticleBlockType, UserArticleType } from '../consts/consts';

export interface ArticleBlockBase {
    id: number;
    type: ArticleBlockType;
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE;
    code: string;
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE;
    src: string;
    title?: string;
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT;
    title?: string;
    subtitle?: string;
    paragraphs: string[];
}

export type ArticleBlock =
    | ArticleCodeBlock
    | ArticleTextBlock
    | ArticleImageBlock;

interface MetaData {
    meta: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        itemCount: number;
        limit: number;
        page: number;
        pageCount: number;
    };
}

export interface Article {
    id: number;
    userId: number;
    title: string;
    subtitle?: string | null;
    img: string;
    views: number;
    createdAt: string;
    type: UserArticleType[];
    blocks: ArticleBlock[];
}

export interface ArticleExpandedUser {
    id: number;
    user: User;
    title: string;
    subtitle?: string;
    img: string;
    views: number;
    createdAt: string;
    type: UserArticleType[];
    blocks: ArticleBlock[];
}

export interface ArticlesServerResponse extends MetaData {
    data: Article[];
}

export interface ArticlesExpandedUserServerResponse extends MetaData {
    data: ArticleExpandedUser[];
}

export interface ArticleCreateDto {
    title: string;
    subtitle?: string;
    views?: number;
    img: string;
    type: UserArticleType[];
    blocks: ArticleBlock[];
}

export type ArticleEditDto = Partial<ArticleCreateDto> & {
    id: number;
};
