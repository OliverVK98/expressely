import { useTranslation } from 'react-i18next';
import {
    Dispatch,
    memo,
    SetStateAction,
    useCallback,
    useMemo,
    useState,
} from 'react';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '@/entities/Article';
import { TabItem } from '@/shared/ui/Tabs';
import {
    ArticleBlocksReadonly,
    ArticleCodeContentAdd,
    ArticleImageContentAdd,
    ArticleTextContentAdd,
} from '@/features/articleContentAdd';
import { VStack } from '@/shared/ui/Stack';

interface ArticleBlockCreatorProps {
    className?: string;
    blocks: ArticleBlock[];
    setBlocks: Dispatch<SetStateAction<ArticleBlock[]>>;
}

export const ArticleBlockCreator = memo((props: ArticleBlockCreatorProps) => {
    const { className, blocks, setBlocks } = props;
    const { t } = useTranslation();
    const [tab, setTab] = useState<ArticleBlockType>(ArticleBlockType.TEXT);

    const onTabClick = useCallback((tab: TabItem) => {
        setTab(tab.value as ArticleBlockType);
    }, []);

    const onAddClick = useCallback(
        (args: Omit<ArticleBlock, 'id'>) => {
            const id =
                blocks.length > 0
                    ? String(+blocks[blocks.length - 1].id + 1)
                    : '1';

            if (tab === ArticleBlockType.CODE) {
                setBlocks([...blocks, { ...(args as ArticleCodeBlock), id }]);
            }

            if (tab === ArticleBlockType.IMAGE) {
                setBlocks([...blocks, { ...(args as ArticleImageBlock), id }]);
            }

            if (tab === ArticleBlockType.TEXT) {
                setBlocks([...blocks, { ...(args as ArticleTextBlock), id }]);
            }
        },
        [blocks, tab],
    );

    const onRemoveClick = useCallback(
        (index: number) => {
            if (blocks) {
                const newBlocks = [...blocks];
                newBlocks.splice(index, 1);
                setBlocks(newBlocks);
            }
        },
        [blocks],
    );

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleBlockType.CODE,
                content: t('Code'),
            },
            {
                value: ArticleBlockType.TEXT,
                content: t('Text'),
            },
            {
                value: ArticleBlockType.IMAGE,
                content: t('Image'),
            },
        ],
        [t],
    );

    return (
        <VStack gap="8" max className={className}>
            <VStack gap="16" max>
                {blocks.length !== 0 && (
                    <ArticleBlocksReadonly
                        onRemoveClick={onRemoveClick}
                        blocks={blocks}
                    />
                )}
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
