import { memo, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCreatePageReducer } from '../../model/slices/articleCreatePageSlice';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleCreatePageSidebar } from '../ArticleCreatePageSidebar/ArticleCreatePageSidebar';
import { ArticleCreate } from '../ArticleCreate/ArticleCreate';
import { addNewArticle } from '../../model/services/addNewArticle';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useArticleCreatePageState } from '../../model/selectors/articleCreatePageSelectors';
import { ArticlePreviewContainer } from '../ArticlePreviewContainer/ArticlePreviewContainer';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleCreatePage: articleCreatePageReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const [isPreview, setIsPreview] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const state = useArticleCreatePageState();

    const onPreviewButtonClick = () => {
        setIsPreview((prevState) => !prevState);
    };

    const onPublishHandler = useCallback(() => {
        dispatch(
            addNewArticle({
                article: {
                    title: state!.title,
                    subtitle: state?.subtitle,
                    img: state!.img,
                    type: state!.type,
                    blocks: state!.blocks,
                },
                navigate,
            }),
        );
    }, [navigate, dispatch, state]);

    const content = (
        <Page className={className}>
            {!isPreview && (
                <ArticleCreate
                    onPublishHandler={onPublishHandler}
                    onPreviewButtonClick={onPreviewButtonClick}
                />
            )}
            {isPreview && (
                <ArticlePreviewContainer
                    onPublishHandler={onPublishHandler}
                    onPreviewButtonClick={onPreviewButtonClick}
                />
            )}
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <StickyContentLayout
                content={content}
                right={<ArticleCreatePageSidebar />}
            />
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
