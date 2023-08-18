import { useTranslation } from 'react-i18next';
import { ArticleExpandedUser } from '@/entities/Article';
import { ArticlePreview } from '@/features/articlePreview';

interface ArticlePreviewContainerProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
    article: ArticleExpandedUser;
}

export const ArticlePreviewContainer = (
    props: ArticlePreviewContainerProps,
) => {
    const { className, onPreviewButtonClick, onPublishHandler, article } =
        props;
    const { t } = useTranslation();

    return (
        <ArticlePreview
            className={className}
            includeActions
            blocks={article.blocks}
            title={article.title}
            subtitle={article.subtitle}
            imgSrc={article.img}
            firstActionButtonText={t('Back to Editing')}
            onFirstActionButtonClick={onPreviewButtonClick}
            secondActionButtonText={t('Publish Article')}
            onSecondActionButtonClick={onPublishHandler}
        />
    );
};
