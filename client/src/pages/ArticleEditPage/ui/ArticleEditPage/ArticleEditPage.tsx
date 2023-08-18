import { memo, useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleEditPageReducer } from '../../model/slice/articleEditPageSlice';
import { ArticleEdit } from '../ArticleEdit/ArticleEdit';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { fetchArticleById } from '@/entities/Article';
import {
    useArticleEditPageDetails,
    useArticleEditPageError,
    useArticleEditPageIsLoading,
    useArticleEditPageState,
} from '../../model/selectors/articleEditPageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateArticle } from '../../model/services/updateArticle';
import { ErrorCard } from '@/shared/ui/ErrorCard';
import { ArticlePreviewContainer } from '../ArticlePreviewContainer/ArticlePreviewContainer';

interface ArticleEditPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleEditPage: articleEditPageReducer,
};

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
    const { className } = props;
    const { id } = useParams<{
        id: string;
    }>();
    const [isPreview, setIsPreview] = useState(false);
    const dispatch = useAppDispatch();
    const article = useArticleEditPageDetails();
    const isLoading = useArticleEditPageIsLoading();
    const state = useArticleEditPageState();
    const navigate = useNavigate();
    const error = useArticleEditPageError();

    const onPreviewButtonClick = () => {
        setIsPreview((prevState) => !prevState);
    };

    const onPublishHandler = useCallback(() => {
        dispatch(
            updateArticle({
                article: {
                    id: +id!,
                    title: state!.article.title,
                    subtitle: state?.article.subtitle,
                    img: state!.article.img,
                    type: state!.article.type,
                    blocks: state!.article.blocks,
                    views: state!.article.views,
                },
                navigate,
            }),
        );
    }, [navigate, dispatch, id, state]);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id!));
    });

    const content = (
        <Page className={className}>
            {error && <ErrorCard />}
            {!isPreview && (
                <ArticleEdit
                    onPublishHandler={onPublishHandler}
                    onPreviewButtonClick={onPreviewButtonClick}
                    article={article}
                    isLoading={isLoading}
                />
            )}
            {isPreview && (
                <ArticlePreviewContainer
                    article={article!}
                    onPublishHandler={onPublishHandler}
                    onPreviewButtonClick={onPreviewButtonClick}
                />
            )}
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <StickyContentLayout content={content} />
        </DynamicModuleLoader>
    );
});

export default ArticleEditPage;
