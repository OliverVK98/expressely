import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArticleTextBlock,
    ArticleTextBlockComponent,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import cls from './ArticleBlocksReadonly.module.scss';
import { BlockPositionSwitchers } from '@/features/blockPositionSwitchers';

interface ArticleTextBlockReadonlyProps {
    className?: string;
    index: number;
    moveBlockUp: (index: number) => void;
    moveBlockDown: (index: number) => void;
    onRemoveClick: (index: number) => void;
    block: ArticleTextBlock;
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
        } = props;
        const { t } = useTranslation();

        return (
            <HStack max>
                <BlockPositionSwitchers
                    onClickUp={() => moveBlockUp(index)}
                    onClickDown={() => moveBlockDown(index)}
                />

                <Card className={className} max padding="16">
                    <VStack gap="4" max>
                        <ArticleTextBlockComponent block={block} />
                        <HStack max justify="end">
                            <Button
                                className={cls.btn}
                                color="error"
                                variant="outline"
                                onClick={() => onRemoveClick(index)}
                            >
                                <Text text={t('Remove Block')} />
                            </Button>
                        </HStack>
                    </VStack>
                </Card>
            </HStack>
        );
    },
);
