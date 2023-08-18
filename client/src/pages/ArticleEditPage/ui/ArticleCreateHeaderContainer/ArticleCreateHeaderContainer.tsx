import { useCallback } from 'react';
import { ArticleCreateHeader } from '@/features/articleCreator';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { ArticleExpandedUser, UserArticleType } from '@/entities/Article';
import { articleEditPageActions } from '../../model/slice/articleEditPageSlice';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface ArticleCreateHeaderContainerProps {
    className?: string;
    article?: ArticleExpandedUser;
    isLoading?: boolean;
    error?: string;
}

export const ArticleCreateHeaderContainer = (
    props: ArticleCreateHeaderContainerProps,
) => {
    const { className, article, isLoading, error } = props;
    const dispatch = useAppDispatch();

    const onTypeAddClick = useCallback(() => {
        dispatch(articleEditPageActions.addType());
    }, [dispatch]);

    const onChangeType = useCallback(
        (newType: UserArticleType, index: number) => {
            dispatch(articleEditPageActions.updateType({ newType, index }));
        },
        [dispatch],
    );

    const onRemoveType = useCallback(
        (index: number) => {
            dispatch(articleEditPageActions.removeType(index));
        },
        [dispatch],
    );

    const onChangeTitle = useCallback(
        (title: string) => {
            dispatch(articleEditPageActions.setTitle(title));
        },
        [dispatch],
    );

    const onChangeSubtitle = useCallback(
        (subtitle: string) => {
            dispatch(articleEditPageActions.setSubtitle(subtitle));
        },
        [dispatch],
    );

    const onChangeUrl = useCallback(
        (img: string) => {
            dispatch(articleEditPageActions.setImg(img));
        },
        [dispatch],
    );

    if (error) return <ErrorCard />;

    return (
        <ArticleCreateHeader
            imgSrc={article?.img}
            title={article?.title}
            onChangeSubtitle={onChangeSubtitle}
            subtitle={article?.subtitle}
            userData={article?.user}
            onChangeUrl={onChangeUrl}
            types={article?.type}
            onTypeAddClick={onTypeAddClick}
            onChangeType={onChangeType}
            onChangeTitle={onChangeTitle}
            className={className}
            isLoading={isLoading}
            isEditMode
            onRemoveType={onRemoveType}
        />
    );
};
