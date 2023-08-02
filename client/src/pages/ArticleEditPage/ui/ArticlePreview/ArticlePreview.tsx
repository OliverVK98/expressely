import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails, ArticleExpandedUser } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';

import { VStack } from '@/shared/ui/Stack';
import { ArticleCreateActions } from '@/features/articleCreator';

interface ArticlePreviewProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
    article: ArticleExpandedUser;
}

export const ArticlePreview = (props: ArticlePreviewProps) => {
    const { className, onPreviewButtonClick, onPublishHandler, article } =
        props;
    const { t } = useTranslation();

    return (
        <VStack max gap="16">
            <Card max className={className} border="default" padding="24">
                <ArticleDetails
                    blocks={article.blocks}
                    title={article.title}
                    subtitle={article.subtitle}
                    img={article.img}
                />
            </Card>
            <ArticleCreateActions
                firstActionButtonText={t('Back to Editing')}
                onFirstActionButtonClick={onPreviewButtonClick}
                secondActionButtonText={t('Publish Article')}
                onSecondActionButtonClick={onPublishHandler}
            />
        </VStack>
    );
};
