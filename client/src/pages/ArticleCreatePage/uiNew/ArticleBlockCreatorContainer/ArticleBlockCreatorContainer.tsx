import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockCreator } from '@/features/articleCreator';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useArticleCreatePageBlocks } from '../../model/selectors/articleCreatePageSelectors';
import { TabItem } from '@/shared/ui/Tabs';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlock,
    ArticleImageBlock,
    ArticleTextBlock,
} from '@/entities/Article';
import { articleCreatePageActions } from '../../model/slices/articleCreatePageSlice';

interface ArticleBlockCreatorContainerProps {
    className?: string;
}

export const ArticleBlockCreatorContainer = (
    props: ArticleBlockCreatorContainerProps,
) => {
    const { className } = props;
    const { t } = useTranslation();
    const [tab, setTab] = useState<ArticleBlockType>(ArticleBlockType.TEXT);
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
        <ArticleBlockCreator
            blocks={blocks}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            onRemoveClick={onRemoveClick}
            onTabClick={onTabClick}
            tab={tab}
            onAddClick={onAddClick}
            typeTabs={typeTabs}
            className={className}
        />
    );
};
