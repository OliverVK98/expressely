import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import { ArticleCreateHeader } from '@/features/articleCreator';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    useArticleCreatePageImg,
    useArticleCreatePageSubtitle,
    useArticleCreatePageTitle,
    useArticleCreatePageTypes,
} from '../../model/selectors/articleCreatePageSelectors';
import { getUserAuthData } from '@/entities/User';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';
import { UserArticleType } from '@/entities/Article';

interface ArticleCreateHeaderContainerProps {
    className?: string;
    isEditMode: boolean;
}

export const ArticleCreateHeaderContainer = (
    props: ArticleCreateHeaderContainerProps,
) => {
    const { className, isEditMode } = props;
    const dispatch = useAppDispatch();
    const imgSrc = useArticleCreatePageImg();
    const title = useArticleCreatePageTitle();
    const userData = useSelector(getUserAuthData);
    const subtitle = useArticleCreatePageSubtitle();
    const types = useArticleCreatePageTypes();

    const onTypeAddClick = useCallback(() => {
        dispatch(articleCreatePageActions.addType());
    }, [dispatch]);

    const onChangeType = useCallback(
        (newType: UserArticleType, index: number) => {
            dispatch(articleCreatePageActions.updateType({ newType, index }));
        },
        [dispatch],
    );

    const onRemoveType = useCallback(
        (index: number) => {
            dispatch(articleCreatePageActions.removeType(index));
        },
        [dispatch],
    );

    const onChangeTitle = useCallback(
        (title: string) => {
            dispatch(articleCreatePageActions.setTitle(title));
        },
        [dispatch],
    );

    const onChangeSubtitle = useCallback(
        (subtitle: string) => {
            dispatch(articleCreatePageActions.setSubtitle(subtitle));
        },
        [dispatch],
    );

    const onChangeUrl = useCallback(
        (img: string) => {
            dispatch(articleCreatePageActions.setImg(img));
        },
        [dispatch],
    );

    return (
        <ArticleCreateHeader
            imgSrc={imgSrc}
            title={title}
            onChangeSubtitle={onChangeSubtitle}
            subtitle={subtitle}
            userData={userData}
            onChangeUrl={onChangeUrl}
            types={types}
            onTypeAddClick={onTypeAddClick}
            onChangeType={onChangeType}
            onChangeTitle={onChangeTitle}
            className={className}
            isEditMode={isEditMode}
            onRemoveType={onRemoveType}
        />
    );
};
