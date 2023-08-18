import React from 'react';
import { useParams } from 'react-router-dom';
import { Page } from '@/widgets/Page';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import cls from './ArticleAdminPreviewPage.module.scss';
import { useGetNotApprovedArticle } from '../../model/api/getArticle';
import { ArticlePreviewContainer } from '../ArticlePreviewContainer/ArticlePreviewContainer';
import { ArticlePreviewActions } from '../ArticlePreviewActions/ArticlePreviewActions';
import { ErrorCard } from '@/shared/ui/ErrorCard';
import { Skeleton } from '@/shared/ui/Skeleton';

const ArticleAdminPreviewPage = () => {
    const { id } = useParams<{
        id: string;
    }>();
    const { error, isLoading, data } = useGetNotApprovedArticle(+id!);

    let content;

    if (isLoading) {
        content = <Skeleton width="max" height={1000} />;
    }

    if (error) {
        content = <ErrorCard />;
    } else {
        content = <ArticlePreviewContainer article={data} />;
    }

    return (
        <StickyContentLayout
            content={<Page>{content}</Page>}
            right={
                <ArticlePreviewActions
                    articleId={+id!}
                    className={cls.rightbar}
                    isLoading={isLoading}
                    isError={!!error}
                />
            }
        />
    );
};

export default ArticleAdminPreviewPage;
