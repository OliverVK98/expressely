import React from 'react';
import { useSelector } from 'react-redux';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { MainPageHeader } from '../MainPageHeader/MainPageHeader';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { mainPageReducer } from '../../model/slices/mainPageSlice';
import { VStack } from '@/shared/ui/Stack';
import { ArticlesRecommendationsListContainer } from '@/features/articlesRecommendationsList';
import cls from './MainPage.module.scss';
import { useMainPageFeedType } from '../../model/selectors/mainPageSelectors';
import { MainPageArticles } from '../MainPageArticles/MainPageArticles';
import { getUserAuthData } from '@/entities/User';

const reducers: ReducersList = {
    mainPage: mainPageReducer,
};

const MainPage = () => {
    const articlesType = useMainPageFeedType();
    const authData = useSelector(getUserAuthData);

    const content = (
        <Page data-testid="MainPage">
            <VStack max gap="16">
                <MainPageHeader authData={authData} />
                <MainPageArticles
                    articlesType={articlesType}
                    authData={authData}
                />
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
