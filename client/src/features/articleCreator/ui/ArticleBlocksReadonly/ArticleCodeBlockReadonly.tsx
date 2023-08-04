import React, { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArticleCodeBlock,
    ArticleCodeBlockComponent,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import cls from './ArticleBlocksReadonly.module.scss';
import { BlockPositionSwitchers } from '@/features/blockPositionSwitchers';
import { ArticleCodeContentEdit } from '@/features/articleContentEdit';

interface ArticleCodeBlockReadonlyProps {
    className?: string;
    index: number;
    moveBlockUp: (index: number) => void;
    moveBlockDown: (index: number) => void;
    onRemoveClick: (index: number) => void;
    block: ArticleCodeBlock;
    updateBlockContent: (block: ArticleCodeBlock) => void;
}

export const ArticleCodeBlockReadonly = memo(
    (props: ArticleCodeBlockReadonlyProps) => {
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
            (block: ArticleCodeBlock) => {
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
                <ArticleCodeContentEdit
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
                        <ArticleCodeBlockComponent block={block} />
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
