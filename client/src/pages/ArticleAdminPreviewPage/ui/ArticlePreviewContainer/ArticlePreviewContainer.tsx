import React from 'react';
import { ArticlePreview } from '@/features/articlePreview';
import { ArticleExpandedUser } from '@/entities/Article';

interface ArticlePreviewContainerProps {
    className?: string;
    article?: ArticleExpandedUser;
}

export const ArticlePreviewContainer = (
    props: ArticlePreviewContainerProps,
) => {
    const { className, article } = props;

    return (
        <ArticlePreview
            className={className}
            blocks={article?.blocks}
            title={article?.title}
            imgSrc={article?.img}
            subtitle={article?.subtitle}
            includeActions={false}
        />
    );
};
