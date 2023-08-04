import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArticleImageBlock,
    ArticleImageBlockComponent,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import cls from './ArticleBlocksReadonly.module.scss';
import { BlockPositionSwitchers } from '@/features/blockPositionSwitchers';
import { ArticleImageContentEdit } from '@/features/articleContentEdit';

interface ArticleImageBlockReadonlyProps {
    className?: string;
    index: number;
    moveBlockUp: (index: number) => void;
    moveBlockDown: (index: number) => void;
    onRemoveClick: (index: number) => void;
    block: ArticleImageBlock;
    updateBlockContent: (block: ArticleImageBlock) => void;
}

export const ArticleImageBlockReadonly = memo(
    (props: ArticleImageBlockReadonlyProps) => {
        const {
            className,
            moveBlockUp,
            moveBlockDown,
            index,
            onRemoveClick,
            block,
            updateBlockContent,
        } = props;
        const [editMode, setEditMode] = useState(false);
        const { t } = useTranslation();

        const onSaveButtonClick = useCallback(
            (block: ArticleImageBlock) => {
                updateBlockContent(block);
                setEditMode(false);
            },
            [updateBlockContent],
        );

        const onEditButtonClick = useCallback(() => {
            setEditMode(true);
        }, []);

        if (editMode)
            return (
                <ArticleImageContentEdit
                    block={block}
                    onSaveClick={onSaveButtonClick}
                />
            );

        return (
            <HStack max>
                <BlockPositionSwitchers
                    onClickUp={() => moveBlockUp(index)}
                    onClickDown={() => moveBlockDown(index)}
                />

                <Card className={className} max padding="16">
                    <VStack gap="4" max>
                        <ArticleImageBlockComponent block={block} />
                        <HStack max justify="end">
                            <Button
                                className={cls.btn}
                                variant="outline"
                                onClick={onEditButtonClick}
                            >
                                {t('Edit')}
                            </Button>
                            <Button
                                className={cls.btn}
                                color="error"
                                variant="outline"
                                onClick={() => onRemoveClick(index)}
                            >
                                {t('Remove Block')}
                            </Button>
                        </HStack>
                    </VStack>
                </Card>
            </HStack>
        );
    },
);
