import { memo } from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '@/entities/Article';
import { TabItem } from '@/shared/ui/Tabs';
import {
    ArticleCodeContentAdd,
    ArticleImageContentAdd,
    ArticleTextContentAdd,
} from '@/features/articleContentAdd';
import { VStack } from '@/shared/ui/Stack';
import { ArticleBlocksReadonly } from '../ArticleBlocksReadonly/ArticleBlocksReadonly';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ErrorCard } from '@/shared/ui/ErrorCard';

interface ArticleBlockCreatorProps {
    className?: string;
    onTabClick: (tab: TabItem) => void;
    onAddClick: (args: Omit<ArticleBlock, 'id'>) => void;
    typeTabs: TabItem[];
    tab: ArticleBlockType;
    moveBlockUp: (index: number) => void;
    moveBlockDown: (index: number) => void;
    onRemoveClick: (index: number) => void;
    blocks?: ArticleBlock[];
    updateBlockContent: (
        block: ArticleTextBlock | ArticleImageBlock | ArticleCodeBlock,
    ) => void;
    isLoading?: boolean;
    error?: string;
}

export const ArticleBlockCreator = memo((props: ArticleBlockCreatorProps) => {
    const {
        className,
        typeTabs,
        onTabClick,
        onAddClick,
        tab,
        onRemoveClick,
        blocks,
        moveBlockUp,
        moveBlockDown,
        isLoading,
        updateBlockContent,
        error,
    } = props;

    if (error) return <ErrorCard />;
    if (isLoading) return <Skeleton height={300} width="max" />;

    return (
        <VStack gap="8" max className={className}>
            <VStack gap="16" max>
                <ArticleBlocksReadonly
                    moveBlockUp={moveBlockUp}
                    moveBlockDown={moveBlockDown}
                    blocks={blocks}
                    onRemoveClick={onRemoveClick}
                    updateBlockContent={updateBlockContent}
                />
            </VStack>
            <ArticleTextContentAdd
                typeTabs={typeTabs}
                onTabClick={onTabClick}
                currentTab={tab}
                onAddClick={onAddClick}
            />
            <ArticleImageContentAdd
                typeTabs={typeTabs}
                onTabClick={onTabClick}
                currentTab={tab}
                onAddClick={onAddClick}
            />
            <ArticleCodeContentAdd
                typeTabs={typeTabs}
                onTabClick={onTabClick}
                currentTab={tab}
                onAddClick={onAddClick}
            />
        </VStack>
    );
});
