import { useCallback } from 'react';
import { ArticleCreateHeader } from '@/features/articleCreator';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { ArticleExpandedUser, ArticleType } from '@/entities/Article';
import { articleEditPageActions } from '../../model/slice/articleEditPageSlice';

interface ArticleCreateHeaderContainerProps {
    className?: string;
    article?: ArticleExpandedUser;
    isLoading?: boolean;
}

export const ArticleCreateHeaderContainer = (
    props: ArticleCreateHeaderContainerProps,
) => {
    const { className, article, isLoading } = props;
    const dispatch = useAppDispatch();

    const onTypeAddClick = useCallback(() => {
        dispatch(articleEditPageActions.addType());
    }, [dispatch]);

    const onChangeType = useCallback(
        (newType: ArticleType, index: number) => {
            dispatch(articleEditPageActions.updateType({ newType, index }));
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
        />
    );
};
