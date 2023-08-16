import { useTranslation } from 'react-i18next';
import { memo, useCallback, useMemo } from 'react';
import { TabItem, Tabs } from '@/shared/ui/Tabs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleType } from '@/entities/Article';
import cls from './ArticleTypeTabs.module.scss';
import { VStack } from '@/shared/ui/Stack';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo((props: ArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props;
    const { t } = useTranslation();

    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.ALL,
                content: t('All Articles'),
            },
            ...Object.values(ArticleType)
                .filter((type) => type !== ArticleType.ALL)
                .map((type) => ({
                    value: type,
                    content: type,
                })),
        ],
        [t],
    );

    const onTabClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <VStack max className={cls.textAlign}>
            <Tabs
                direction="column"
                tabs={typeTabs}
                value={value}
                onTabClick={onTabClick}
                className={classNames('', {}, [className])}
                max
            />
        </VStack>
    );
});
