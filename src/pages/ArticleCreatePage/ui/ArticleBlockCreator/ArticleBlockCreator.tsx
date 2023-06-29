import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo, useState } from 'react';
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
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useArticleCreatePageBlocks } from '../../model/selectors/articleCreatePageSelectors';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';
import { ArticleBlocksReadonly } from '../ArticleBlocksReadonly/ArticleBlocksReadonly';

interface ArticleBlockCreatorProps {
    className?: string;
}

export const ArticleBlockCreator = memo((props: ArticleBlockCreatorProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [tab, setTab] = useState<ArticleBlockType>(ArticleBlockType.TEXT);
    const dispatch = useAppDispatch();
    const blocks = useArticleCreatePageBlocks();

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
                dispatch(
                    articleCreatePageActions.addCodeBlock({
                        ...(args as ArticleCodeBlock),
                        id,
                    }),
                );
            }

            if (tab === ArticleBlockType.IMAGE) {
                dispatch(
                    articleCreatePageActions.addImageBlock({
                        ...(args as ArticleImageBlock),
                        id,
                    }),
                );
            }

            if (tab === ArticleBlockType.TEXT) {
                dispatch(
                    articleCreatePageActions.addTextBlock({
                        ...(args as ArticleTextBlock),
                        id,
                    }),
                );
            }
        },
        [blocks, dispatch, tab],
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
                {blocks.length !== 0 && <ArticleBlocksReadonly />}
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
