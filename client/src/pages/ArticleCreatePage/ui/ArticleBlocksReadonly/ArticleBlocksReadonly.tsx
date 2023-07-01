import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
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
import { Button } from '@/shared/ui/Button';
import cls from './ArticleBlocksReadonly.module.scss';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useArticleCreatePageBlocks } from '../../model/selectors/articleCreatePageSelectors';

interface ArticleBlocksReadonlyProps {
    className?: string;
}

export const ArticleBlocksReadonly = memo(
    (props: ArticleBlocksReadonlyProps) => {
        const { className } = props;
        const { t } = useTranslation();
        const dispatch = useAppDispatch();
        const blocks = useArticleCreatePageBlocks();

        const onRemoveClick = useCallback(
            (index: number) => {
                if (blocks) {
                    dispatch(articleCreatePageActions.removeBlockById(index));
                }
            },
            [blocks, dispatch],
        );

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

        if (!blocks) {
            return null;
        }

        return <>{blocks.map(renderBlock)}</>;
    },
);
