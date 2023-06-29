import React, { useCallback } from 'react';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleBlocksRenderer } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './ArticlePreviewModal.module.scss';
import {
    useArticleCreatePageBlocks,
    useArticleCreatePageImg,
    useArticleCreatePageIsModalOpen,
    useArticleCreatePageSubtitle,
    useArticleCreatePageTitle,
} from '../../model/selectors/articleCreatePageSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';

interface ArticlePreviewModalProps {
    className?: string;
}

export const ArticlePreviewModal = (props: ArticlePreviewModalProps) => {
    const { className } = props;
    const dispatch = useAppDispatch();
    const isModalOpen = useArticleCreatePageIsModalOpen();
    const blocks = useArticleCreatePageBlocks();
    const imgSrc = useArticleCreatePageImg();
    const title = useArticleCreatePageTitle();
    const subtitle = useArticleCreatePageSubtitle();

    const onCloseHandler = useCallback(() => {
        dispatch(articleCreatePageActions.closeModal());
    }, [dispatch]);

    if (!isModalOpen) return null;

    return (
        <Modal
            isOpen={isModalOpen}
            onClose={onCloseHandler}
            className={classNames('', {}, [className])}
            lazy
        >
            <Card max padding="16">
                <Text title={title} size="l" bold />
                <Text title={subtitle} />
                <AppImage
                    className={cls.img}
                    fallback={
                        <Skeleton width="100%" height={420} border="16px" />
                    }
                    src={imgSrc}
                />
                <ArticleBlocksRenderer blocks={blocks} />
            </Card>
        </Modal>
    );
};
