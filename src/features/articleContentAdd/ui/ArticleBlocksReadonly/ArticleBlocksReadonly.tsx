import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useEffect, useState } from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlockComponent,
    ArticleTextBlockComponent,
    ArticleImageBlockComponent,
} from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import cls from '../sharedStyles/sharedStyles.module.scss';
import { Button } from '@/shared/ui/Button';

interface ArticleBlocksReadonlyProps {
    className?: string;
    blocks: ArticleBlock[] | undefined;
    onRemoveClick: (index: number) => void;
}

export const ArticleBlocksReadonly = memo(
    (props: ArticleBlocksReadonlyProps) => {
        const { className, blocks, onRemoveClick } = props;
        const [currentBlocks, setCurrentBlocks] = useState<
            ArticleBlock[] | undefined
        >(blocks);

        useEffect(() => {
            setCurrentBlocks(blocks);
        }, [blocks]);

        const { t } = useTranslation();

        const renderBlock = useCallback(
            (block: ArticleBlock, index: number) => {
                switch (block.type) {
                    case ArticleBlockType.CODE:
                        return (
                            <Card
                                className={className}
                                max
                                padding="16"
                                key={block.id}
                            >
                                <VStack gap="4" max>
                                    <ArticleCodeBlockComponent block={block} />
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
                        );
                    case ArticleBlockType.TEXT:
                        return (
                            <Card
                                className={className}
                                max
                                padding="16"
                                key={block.id}
                            >
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
                        );
                    case ArticleBlockType.IMAGE:
                        return (
                            <Card
                                className={className}
                                max
                                padding="16"
                                key={block.id}
                            >
                                <VStack gap="4" max>
                                    <ArticleImageBlockComponent block={block} />
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
                        );
                    default:
                        return null;
                }
            },
            [onRemoveClick, t],
        );

        if (!currentBlocks) {
            return null;
        }

        return <>{currentBlocks.map(renderBlock)}</>;
    },
);
