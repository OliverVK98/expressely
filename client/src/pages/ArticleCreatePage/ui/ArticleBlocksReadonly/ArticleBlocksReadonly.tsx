import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import { ArticleBlock, ArticleBlockType } from '@/entities/Article';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useArticleCreatePageBlocks } from '../../model/selectors/articleCreatePageSelectors';
import { ArticleCodeBlockReadonly } from './ArticleCodeBlockReadonly';
import { ArticleTextBlockReadonly } from './ArticleTextBlockReadonly';
import { ArticleImageBlockReadonly } from './ArticleImageBlockReadonly';

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

        const moveBlockUp = useCallback(
            (index: number) => {
                dispatch(articleCreatePageActions.moveBlockUp(index));
            },
            [dispatch],
        );

        const moveBlockDown = useCallback(
            (index: number) => {
                dispatch(articleCreatePageActions.moveBlockDown(index));
            },
            [dispatch],
        );

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
