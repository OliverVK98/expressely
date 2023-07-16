import { memo } from 'react';
import { useParams } from 'react-router-dom';
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

    const content = (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16" max>
                <DetailsContainer />
                <ArticleRating articleId={+id!} />
                {/* <ArticleDetailsComments id={+id!} /> */}
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
        <DynamicModuleLoader reducers={reducers} removerAfterUnmount>
            <StickyContentLayout content={content} right={rightBarContent} />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
