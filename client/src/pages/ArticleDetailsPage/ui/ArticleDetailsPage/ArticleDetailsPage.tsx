import { memo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArticlesRecommendationsListContainer } from '@/features/articlesRecommendationsList';
import { VStack } from '@/shared/ui/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import { ArticleRating } from '@/features/articleRating';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { getUserAuthData } from '@/entities/User';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { incrementArticleViews, addArticleToHistory } from '@/entities/Article';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { id } = useParams<{
        id: string;
    }>();
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    useInitialEffect(() => {
        dispatch(incrementArticleViews({ id: +id! }));
    });

    useEffect(() => {
        if (authData) {
            dispatch(addArticleToHistory(+id!));
        }
    }, []);

    const content = (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
                <DetailsContainer />
                {authData && <ArticleRating articleId={+id!} />}
                <ArticleDetailsComments id={+id!} />
            </VStack>
        </Page>
    );

    const rightBarContent = (
        <VStack gap="32">
            <AdditionalInfoContainer />
            <ArticlesRecommendationsListContainer />
        </VStack>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <StickyContentLayout content={content} right={rightBarContent} />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
