import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { ArticleCreateActions } from '@/features/articleCreator';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useArticleCreatePageState } from '../../model/selectors/articleCreatePageSelectors';
import { getUserAuthData } from '@/entities/User';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';
import { addNewArticle } from '../../model/services/addNewArticle/addNewArticle';

interface ArticleCreateActionsContainerProps {
    className?: string;
}

export const ArticleCreateActionsContainer = (
    props: ArticleCreateActionsContainerProps,
) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const state = useArticleCreatePageState();
    const userData = useSelector(getUserAuthData);

    const onPreviewHandler = useCallback(() => {
        dispatch(articleCreatePageActions.openModal());
    }, [dispatch]);

    const onPublishHandler = useCallback(() => {
        dispatch(
            addNewArticle({
                title: state!.title,
                subtitle: state?.subtitle,
                img: state!.img,
                type: state!.type,
                blocks: state!.blocks,
            }),
        );
    }, [dispatch, state, userData]);

    return (
        <ArticleCreateActions
            onPreviewHandler={onPreviewHandler}
            onPublishHandler={onPublishHandler}
            className={className}
        />
    );
};
