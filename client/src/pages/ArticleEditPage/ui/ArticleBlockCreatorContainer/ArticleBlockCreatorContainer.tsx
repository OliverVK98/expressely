import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleBlockCreator } from '@/features/articleCreator';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TabItem } from '@/shared/ui/Tabs';
import {
    ArticleBlock,
    ArticleBlockType,
    ArticleCodeBlock,
    ArticleExpandedUser,
    ArticleImageBlock,
    ArticleTextBlock,
} from '@/entities/Article';
import { articleEditPageActions } from '../../model/slice/articleEditPageSlice';

interface ArticleBlockCreatorContainerProps {
    className?: string;
    article?: ArticleExpandedUser;
    isLoading?: boolean;
}

export const ArticleBlockCreatorContainer = (
    props: ArticleBlockCreatorContainerProps,
) => {
    const { className, article, isLoading } = props;
    const { t } = useTranslation();
    const [tab, setTab] = useState<ArticleBlockType>(ArticleBlockType.TEXT);
    const dispatch = useAppDispatch();

    const onRemoveClick = useCallback(
        (index: number) => {
            if (article?.blocks) {
                dispatch(articleEditPageActions.removeBlockById(index));
            }
        },
        [article, dispatch],
    );

    const moveBlockUp = useCallback(
        (index: number) => {
            dispatch(articleEditPageActions.moveBlockUp(index));
        },
        [dispatch],
    );

    const moveBlockDown = useCallback(
        (index: number) => {
            dispatch(articleEditPageActions.moveBlockDown(index));
        },
        [dispatch],
    );

    const onTabClick = useCallback((tab: TabItem) => {
        setTab(tab.value as ArticleBlockType);
    }, []);

    const onAddClick = useCallback(
        (args: Omit<ArticleBlock, 'id'>) => {
            if (article) {
                const id =
                    article?.blocks.length > 0
                        ? article?.blocks[article?.blocks.length - 1].id + 1
                        : 1;

                if (tab === ArticleBlockType.CODE) {
                    dispatch(
                        articleEditPageActions.addCodeBlock({
                            ...(args as ArticleCodeBlock),
                            id,
                        }),
                    );
                }

                if (tab === ArticleBlockType.IMAGE) {
                    dispatch(
                        articleEditPageActions.addImageBlock({
                            ...(args as ArticleImageBlock),
                            id,
                        }),
                    );
                }

                if (tab === ArticleBlockType.TEXT) {
                    dispatch(
                        articleEditPageActions.addTextBlock({
                            ...(args as ArticleTextBlock),
                            id,
                        }),
                    );
                }
            }
        },
        [article, dispatch, tab],
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

    const updateBlockContent = useCallback(
        (block: ArticleBlock) => {
            dispatch(articleEditPageActions.updateBlockContent(block));
        },
        [dispatch],
    );

    return (
        <ArticleBlockCreator
            blocks={article?.blocks}
            moveBlockUp={moveBlockUp}
            moveBlockDown={moveBlockDown}
            onRemoveClick={onRemoveClick}
            onTabClick={onTabClick}
            tab={tab}
            onAddClick={onAddClick}
            typeTabs={typeTabs}
            className={className}
            updateBlockContent={updateBlockContent}
        />
    );
};
