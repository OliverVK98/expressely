import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import cls from './ArticleBlocksReadonly.module.scss';
import { BlockPositionSwitchers } from '@/features/blockPositionSwitchers';
import { ArticleTextContentEdit } from '@/features/articleContentEdit';

interface ArticleTextBlockReadonlyProps {
    className?: string;
    index: number;
    moveBlockUp: (index: number) => void;
    moveBlockDown: (index: number) => void;
    onRemoveClick: (index: number) => void;
    block: ArticleTextBlock;
    updateBlockContent: (block: ArticleTextBlock) => void;
}

export const ArticleTextBlockReadonly = memo(
    (props: ArticleTextBlockReadonlyProps) => {
        const {
            className,
            moveBlockUp,
            moveBlockDown,
            index,
            onRemoveClick,
            block,
            updateBlockContent,
        } = props;
        const { t } = useTranslation();
        const [editMode, setEditMode] = useState(false);

        const onSaveButtonClick = useCallback(
            (block: ArticleTextBlock) => {
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
                <ArticleTextContentEdit
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
                        <ArticleTextBlockComponent block={block} />
                        <HStack max justify="end" gap="8">
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
