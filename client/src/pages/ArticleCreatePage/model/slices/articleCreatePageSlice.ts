import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleCreatePageSchema } from '../types/articleCreatePageSchema';
import {
    ArticleBlock,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
    ArticleType,
} from '@/entities/Article';

import { addNewArticle } from '../services/addNewArticle';

const initialState: ArticleCreatePageSchema = {
    title: '',
    subtitle: '',
    img: '',
    type: [ArticleType.ALL],
    blocks: [],
};

const articleCreatePageSlice = createSlice({
    name: 'articleCreatePageSlice',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setSubtitle: (state, action: PayloadAction<string>) => {
            state.subtitle = action.payload;
        },
        setImg: (state, action: PayloadAction<string>) => {
            state.img = action.payload;
        },
        addType: (state) => {
            state.type = [...state.type, ArticleType.ALL];
        },
        updateType: (
            state,
            {
                payload: { newType, index },
            }: PayloadAction<{ newType: ArticleType; index: number }>,
        ) => {
            const updatedTypes = [...state.type];
            updatedTypes[index] = newType;
            state.type = updatedTypes;
        },
        addCodeBlock: (state, action: PayloadAction<ArticleCodeBlock>) => {
            state.blocks = [...state.blocks, action.payload];
        },
        addTextBlock: (state, action: PayloadAction<ArticleTextBlock>) => {
            state.blocks = [...state.blocks, action.payload];
        },
        addImageBlock: (state, action: PayloadAction<ArticleImageBlock>) => {
            state.blocks = [...state.blocks, action.payload];
        },
        removeBlockById: (state, action: PayloadAction<number>) => {
            const newBlocks = [...state.blocks];
            newBlocks.splice(action.payload, 1);
            state.blocks = newBlocks;
        },
        moveBlockUp: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index > 0 && index < state.blocks.length) {
                const updatedBlocks = [...state.blocks];
                [updatedBlocks[index], updatedBlocks[index - 1]] = [
                    updatedBlocks[index - 1],
                    updatedBlocks[index],
                ];
                state.blocks = updatedBlocks;
            }
        },
        moveBlockDown: (state, action: PayloadAction<number>) => {
            const index = action.payload;
            if (index >= 0 && index < state.blocks.length - 1) {
                const updatedBlocks = [...state.blocks];
                [updatedBlocks[index], updatedBlocks[index + 1]] = [
                    updatedBlocks[index + 1],
                    updatedBlocks[index],
                ];
                state.blocks = updatedBlocks;
            }
        },
        updateBlockContent: (state, action: PayloadAction<ArticleBlock>) => {
            const blockIndex = state.blocks.findIndex(
                (block) => block.id === action.payload.id,
            );
            if (blockIndex !== -1) {
                state.blocks[blockIndex] = {
                    ...state.blocks[blockIndex],
                    ...action.payload,
                };
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewArticle.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addNewArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    actions: articleCreatePageActions,
    reducer: articleCreatePageReducer,
} = articleCreatePageSlice;
