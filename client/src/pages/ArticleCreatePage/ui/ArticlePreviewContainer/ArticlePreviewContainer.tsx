import { useTranslation } from 'react-i18next';
import {
    useArticleCreatePageBlocks,
    useArticleCreatePageImg,
    useArticleCreatePageSubtitle,
    useArticleCreatePageTitle,
} from '../../model/selectors/articleCreatePageSelectors';
import { ArticlePreview } from '@/features/articlePreview';

interface ArticlePreviewContainerProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
}

export const ArticlePreviewContainer = (
    props: ArticlePreviewContainerProps,
) => {
    const { className, onPreviewButtonClick, onPublishHandler } = props;
    const blocks = useArticleCreatePageBlocks();
    const imgSrc = useArticleCreatePageImg();
    const title = useArticleCreatePageTitle();
    const subtitle = useArticleCreatePageSubtitle();
    const { t } = useTranslation();

    return (
        <ArticlePreview
            className={className}
            title={title}
            subtitle={subtitle}
            blocks={blocks}
            imgSrc={imgSrc}
            includeActions
            firstActionButtonText={t('Back to Editing')}
            secondActionButtonText={t('Publish Article')}
            onFirstActionButtonClick={onPreviewButtonClick}
            onSecondActionButtonClick={onPublishHandler}
        />
    );
};
