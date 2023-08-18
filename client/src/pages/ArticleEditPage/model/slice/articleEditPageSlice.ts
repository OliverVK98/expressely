import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ArticleEditPageSchema } from '../types/articleEditPageSchema';
import {
    ArticleBlock,
    ArticleCodeBlock,
    ArticleExpandedUser,
    ArticleImageBlock,
    ArticleTextBlock,
    UserArticleType,
    fetchArticleById,
} from '@/entities/Article';

const initialState: ArticleEditPageSchema = {
    isLoading: false,
    error: undefined,
    article: {} as ArticleExpandedUser,
};

const articleEditPageSlice = createSlice({
    name: 'articleEditPageSlice',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.article.title = action.payload;
        },
        setSubtitle: (state, action: PayloadAction<string>) => {
            state.article.subtitle = action.payload;
        },
        setImg: (state, action: PayloadAction<string>) => {
            state.article.img = action.payload;
        },
        addType: (state) => {
            state.article.type = [
                ...state.article.type,
                UserArticleType.Programming,
            ];
        },
        updateType: (
            state,
            {
                payload: { newType, index },
            }: PayloadAction<{ newType: UserArticleType; index: number }>,
        ) => {
            const updatedTypes = [...state.article.type];
            updatedTypes[index] = newType;
            state.article.type = updatedTypes;
        },
        removeType: (state, action: PayloadAction<number>) => {
            state.article.type.splice(action.payload, 1);
        },
        addCodeBlock: (state, action: PayloadAction<ArticleCodeBlock>) => {
            state.article.blocks = [...state.article.blocks, action.payload];
        },
        addTextBlock: (state, action: PayloadAction<ArticleTextBlock>) => {
            state.article.blocks = [...state.article.blocks, action.payload];
        },
        addImageBlock: (state, action: PayloadAction<ArticleImageBlock>) => {
            state.article.blocks = [...state.article.blocks, action.payload];
        },
        removeBlockById: (state, action: PayloadAction<number>) => {
            const newBlocks = [...state.article.blocks];
            newBlocks.splice(action.payload, 1);
            state.article.blocks = newBlocks;
        },
        moveBlockUp: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index > 0 && index < state.article.blocks.length) {
                const updatedBlocks = [...state.article.blocks];
                [updatedBlocks[index], updatedBlocks[index - 1]] = [
                    updatedBlocks[index - 1],
                    updatedBlocks[index],
                ];
                state.article.blocks = updatedBlocks;
            }
        },
        moveBlockDown: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.article.blocks.length - 1) {
                const updatedBlocks = [...state.article.blocks];
                [updatedBlocks[index], updatedBlocks[index + 1]] = [
                    updatedBlocks[index + 1],
                    updatedBlocks[index],
                ];
                state.article.blocks = updatedBlocks;
            }
        },
        updateBlockContent: (state, action: PayloadAction<ArticleBlock>) => {
            const blockIndex = state.article.blocks.findIndex(
                (block) => block.id === action.payload.id,
            );
            if (blockIndex !== -1) {
                state.article.blocks[blockIndex] = {
                    ...state.article.blocks[blockIndex],
                    ...action.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.article = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: articleEditPageActions,
    reducer: articleEditPageReducer,
} = articleEditPageSlice;
