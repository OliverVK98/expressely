import { EntityState } from '@reduxjs/toolkit';
import {
    ArticleView,
    ArticleSortField,
    ArticleType,
    ArticleExpandedUser,
} from '@/entities/Article';
import { SortOrder } from '@/shared/types/sort';

export interface ArticlesPageSchema extends EntityState<ArticleExpandedUser> {
    isLoading?: boolean;
    error?: string;
    view: ArticleView;
    page: number;
    limit: number;
    hasMore: boolean;
    order: SortOrder;
    sort: ArticleSortField;
    search: string;
    type: ArticleType;
    _inited: boolean;
}
