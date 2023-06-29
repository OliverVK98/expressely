import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { addNewArticle } from '../../model/services/addNewArticle/addNewArticle';
import { useArticleCreatePageState } from '../../model/selectors/articleCreatePageSelectors';
import { getUserAuthData } from '@/entities/User';

interface ArticleCreateActionsProps {
    className?: string;
}

export const ArticleCreateActions = memo((props: ArticleCreateActionsProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const state = useArticleCreatePageState();
    const userData = useSelector(getUserAuthData);

    const onClickModalHandler = useCallback(() => {
        dispatch(articleCreatePageActions.openModal());
    }, [dispatch]);

    const onSendHandler = useCallback(() => {
        dispatch(
            addNewArticle({
                id: '10',
                title: state!.title,
                subtitle: state?.subtitle,
                img: state!.img,
                views: 333,
                createdAt: '',
                userId: userData!.id,
                type: state!.type,
                blocks: state!.blocks,
            }),
        );
    }, [dispatch, state, userData]);

    return (
        <HStack
            max
            justify="end"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Button onClick={onClickModalHandler}>
                {t('Preview article')}
            </Button>
            <Button color="success" onClick={onSendHandler}>
                {t('Publish article')}
            </Button>
        </HStack>
    );
});
