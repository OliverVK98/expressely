import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ArticleCreatePageSchema } from '../types/articleCreatePageSchema';
import {
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
    ArticleType,
} from '@/entities/Article';

import { addNewArticle } from '../services/addNewArticle/addNewArticle';

const initialState: ArticleCreatePageSchema = {
    title: '',
    subtitle: '',
    img: '',
    type: [ArticleType.All],
    blocks: [],
    isModalOpen: false,
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
            state.type = [...state.type, ArticleType.All];
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
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
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
