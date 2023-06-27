import React from 'react';
import { Modal } from '@/shared/ui/Modal';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    Article,
    ArticleBlock,
    ArticleBlocksRenderer,
} from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { AppImage } from '@/shared/ui/AppImage';
import { Skeleton } from '@/shared/ui/Skeleton';
import cls from './ArticlePreviewModal.module.scss';

interface ArticlePreviewModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    blocks: ArticleBlock[] | undefined;
    header: Partial<Article>;
}

export const ArticlePreviewModal = ({
    className,
    onClose,
    isOpen,
    blocks,
    header,
}: ArticlePreviewModalProps) => (
    <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={classNames('', {}, [className])}
        lazy
    >
        <Card max padding="16">
            <Text title={header?.title} size="l" bold />
            <Text title={header?.subtitle} />
            <AppImage
                className={cls.img}
                fallback={<Skeleton width="100%" height={420} border="16px" />}
                src={header?.img}
            />
            <ArticleBlocksRenderer blocks={blocks} />
        </Card>
    </Modal>
);
