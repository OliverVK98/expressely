import React from 'react';
import { ArticleBlock, ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';

import { VStack } from '@/shared/ui/Stack';
import { ArticleCreateActions } from '@/features/articleCreator';

interface ArticlePreviewBaseProps {
    className?: string;
    blocks?: ArticleBlock[];
    imgSrc?: string;
    title?: string;
    subtitle?: string;
}

interface ArticlePreviewWithActionsProps extends ArticlePreviewBaseProps {
    firstActionButtonText: string;
    secondActionButtonText: string;
    onFirstActionButtonClick: () => void;
    onSecondActionButtonClick: () => void;
    includeActions: true;
}

interface ArticlePreviewWithoutActionsProps extends ArticlePreviewBaseProps {
    includeActions: false;
}

export const ArticlePreview = (
    props: ArticlePreviewWithActionsProps | ArticlePreviewWithoutActionsProps,
) => {
    const { className, blocks, title, imgSrc, subtitle, includeActions } =
        props;

    return (
        <VStack max gap="16">
            <Card max className={className} border="default" padding="24">
                <ArticleDetails
                    blocks={blocks}
                    title={title}
                    subtitle={subtitle}
                    img={imgSrc}
                />
            </Card>
            {includeActions && (
                <ArticleCreateActions
                    firstActionButtonText={props.firstActionButtonText}
                    onFirstActionButtonClick={props.onFirstActionButtonClick}
                    secondActionButtonText={props.secondActionButtonText}
                    onSecondActionButtonClick={props.onSecondActionButtonClick}
                />
            )}
        </VStack>
    );
};
