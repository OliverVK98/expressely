import React from 'react';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { MainPageHeader } from '../MainPageHeader/MainPageHeader';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { mainPageReducer } from '../../model/slices/mainPageSlice';
import { MainPageArticles } from '../MainPageArticles/MainPageArticles';
import { VStack } from '@/shared/ui/Stack';
import { ArticlesRecommendationsListContainer } from '@/features/articlesRecommendationsList';
import cls from './MainPage.module.scss';

const reducers: ReducersList = {
    mainPage: mainPageReducer,
};

const MainPage = () => {
    const content = (
        <Page data-testid="MainPage">
            <VStack max gap="16">
                <MainPageHeader />
                <MainPageArticles />
            </VStack>
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={reducers}>
            <StickyContentLayout
                content={content}
                right={
                    <ArticlesRecommendationsListContainer
                        className={cls.rightbar}
                    />
                }
            />
        </DynamicModuleLoader>
    );
};

export default MainPage;
