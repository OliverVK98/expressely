import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/Card';
import {
    useArticleCreatePageBlocks,
    useArticleCreatePageImg,
    useArticleCreatePageSubtitle,
    useArticleCreatePageTitle,
} from '../../model/selectors/articleCreatePageSelectors';
import { VStack } from '@/shared/ui/Stack';
import { ArticleCreateActions } from '@/features/articleCreator';

interface ArticlePreviewProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
}

export const ArticlePreview = (props: ArticlePreviewProps) => {
    const { className, onPreviewButtonClick, onPublishHandler } = props;
    const blocks = useArticleCreatePageBlocks();
    const imgSrc = useArticleCreatePageImg();
    const title = useArticleCreatePageTitle();
    const subtitle = useArticleCreatePageSubtitle();
    const { t } = useTranslation();

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
            <ArticleCreateActions
                firstActionButtonText={t('Back to Editing')}
                onFirstActionButtonClick={onPreviewButtonClick}
                secondActionButtonText={t('Publish Article')}
                onSecondActionButtonClick={onPublishHandler}
            />
        </VStack>
    );
};
