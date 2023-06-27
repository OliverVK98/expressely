import React, { useCallback } from 'react';
import { ArticleBlock } from '../../model/types/article';
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleBlockType } from '../../model/consts/consts';

interface ArticleBlocksRenderProps {
    blocks: ArticleBlock[] | undefined;
}

export const ArticleBlocksRenderer = (props: ArticleBlocksRenderProps) => {
    const { blocks } = props;

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch (block.type) {
            case ArticleBlockType.CODE:
                return (
                    <ArticleCodeBlockComponent key={block.id} block={block} />
                );
            case ArticleBlockType.TEXT:
                return (
                    <ArticleTextBlockComponent key={block.id} block={block} />
                );
            case ArticleBlockType.IMAGE:
                return (
                    <ArticleImageBlockComponent key={block.id} block={block} />
                );
            default:
                return null;
        }
    }, []);

    if (!blocks) {
        return null;
    }

    return <>{blocks.map(renderBlock)}</>;
};
