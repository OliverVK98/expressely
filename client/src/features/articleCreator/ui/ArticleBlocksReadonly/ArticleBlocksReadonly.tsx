import React, { memo, useCallback } from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '@/entities/Article';
import { ArticleCodeBlockReadonly } from './ArticleCodeBlockReadonly';
import { ArticleTextBlockReadonly } from './ArticleTextBlockReadonly';
import { ArticleImageBlockReadonly } from './ArticleImageBlockReadonly';

interface ArticleBlocksReadonlyProps {
    moveBlockUp: (index: number) => void;
    moveBlockDown: (index: number) => void;
    onRemoveClick: (index: number) => void;
    blocks?: ArticleBlock[];
    updateBlockContent: (
        block: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock,
    ) => void;
}

export const ArticleBlocksReadonly = memo(
    (props: ArticleBlocksReadonlyProps) => {
        const {
            moveBlockUp,
            moveBlockDown,
            onRemoveClick,
            blocks,
            updateBlockContent,
        } = props;

        const renderBlock = useCallback(
            (block: ArticleBlock, index: number) => {
                switch (block.type) {
                    case ArticleBlockType.CODE:
                        return (
                            <ArticleCodeBlockReadonly
                                moveBlockUp={moveBlockUp}
                                moveBlockDown={moveBlockDown}
                                block={block}
                                index={index}
                                onRemoveClick={onRemoveClick}
                                key={block.id}
                                updateBlockContent={updateBlockContent}
                            />
                        );
                    case ArticleBlockType.TEXT:
                        return (
                            <ArticleTextBlockReadonly
                                moveBlockUp={moveBlockUp}
                                moveBlockDown={moveBlockDown}
                                block={block}
                                index={index}
                                onRemoveClick={onRemoveClick}
                                key={block.id}
                                updateBlockContent={updateBlockContent}
                            />
                        );
                    case ArticleBlockType.IMAGE:
                        return (
                            <ArticleImageBlockReadonly
                                moveBlockUp={moveBlockUp}
                                moveBlockDown={moveBlockDown}
                                block={block}
                                index={index}
                                onRemoveClick={onRemoveClick}
                                key={block.id}
                                updateBlockContent={updateBlockContent}
                            />
                        );
                    default:
                        return null;
                }
            },
            [moveBlockDown, moveBlockUp, onRemoveClick],
        );

        if (!blocks) {
            return null;
        }

        return <>{blocks.map(renderBlock)}</>;
    },
);
