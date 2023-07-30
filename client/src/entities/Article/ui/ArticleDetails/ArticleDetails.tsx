import { useTranslation } from 'react-i18next';
import React, { memo } from 'react';
import { Skeleton } from '@/shared/ui/Skeleton';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
    ReducersList,
    DynamicModuleLoader,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';

import cls from './ArticleDetails.module.scss';
import { AppImage } from '@/shared/ui/AppImage';
import { ArticleBlocksRenderer } from '../../ui/ArticleBlocksRenderer/ArticleBlocksRenderer';
import { ArticleBlock } from '../..';

interface ArticleDetailsProps {
    className?: string;
    isLoading?: boolean;
    error?: string | undefined;
    title?: string;
    subtitle?: string;
    img?: string;
    blocks?: ArticleBlock[];
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { className, isLoading, error, img, blocks, subtitle, title } = props;
    const { t } = useTranslation();

    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton
                    className={cls.avatar}
                    width={200}
                    height={200}
                    border="50%"
                />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        );
    } else if (error) {
        content = (
            <Text
                align="center"
                title={t('There was an error loading an article you requested')}
                variant="error"
            />
        );
    } else {
        content = (
            <>
                <Text title={title} size="l" bold />
                <Text title={subtitle} />
                <AppImage
                    className={cls.img}
                    fallback={
                        <Skeleton width="100%" height={420} border="16px" />
                    }
                    src={img}
                />
                <ArticleBlocksRenderer blocks={blocks} />
            </>
        );
    }

    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack
                max
                gap="16"
                className={classNames(cls.ArticleDetails, {}, [className])}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    );
});
