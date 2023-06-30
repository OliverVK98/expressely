import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { MainPageSchema } from '../types/mainPage';
import { ArticleFeedType } from '@/entities/Article';

const initialState: MainPageSchema = {
    isLoading: false,
    error: undefined,
    feedType: ArticleFeedType.ALL,
};

const mainPageSlice = createSlice({
    name: 'mainPageSlice',
    initialState,
    reducers: {
        setFeedType: (state, action: PayloadAction<ArticleFeedType>) => {
            state.feedType = action.payload;
        },
    },
});

export const { actions: mainPageActions, reducer: mainPageReducer } =
    mainPageSlice;
