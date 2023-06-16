import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@/shared/ui/Stack';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleRating } from '@/features/articleRating';
import { articleDetailsPageReducer } from '../../model/slices';
import cls from './ArticleDetailsPage.module.scss';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';

interface ArticleDetailsPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const { id } = useParams<{
        id: string;
    }>();

    const content = (
        <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap="16">
                <DetailsContainer />
                <ArticleRating articleId={id!} />
                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id!} />
            </VStack>
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removerAfterUnmount>
            <StickyContentLayout
                content={content}
                right={<AdditionalInfoContainer />}
            />
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetailsPage);
