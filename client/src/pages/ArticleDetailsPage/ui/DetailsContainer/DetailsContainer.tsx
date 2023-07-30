import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    ArticleDetails,
    articleDetailsReducer,
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
    fetchArticleById,
} from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';

interface DetailsContainerProps {
    className?: string;
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const DetailsContainer = memo((props: DetailsContainerProps) => {
    const { className } = props;
    const { id } = useParams<{
        id: string;
    }>();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id!));
    });

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Card max className={className} border="default" padding="24">
                <ArticleDetails
                    isLoading={isLoading}
                    error={error}
                    img={article?.img}
                    title={article?.title}
                    subtitle={article?.subtitle}
                    blocks={article?.blocks}
                />
            </Card>
        </DynamicModuleLoader>
    );
});
