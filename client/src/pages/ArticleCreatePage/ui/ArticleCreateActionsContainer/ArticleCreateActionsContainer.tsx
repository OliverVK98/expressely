import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCreateActions } from '@/features/articleCreator';
import { useArticleCreatePageState } from '../../model/selectors/articleCreatePageSelectors';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

interface ArticleCreateActionsContainerProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishButtonClick: () => void;
}

export const ArticleCreateActionsContainer = (
    props: ArticleCreateActionsContainerProps,
) => {
    const { className, onPreviewButtonClick, onPublishButtonClick } = props;
    const state = useArticleCreatePageState();
    const { t } = useTranslation();
    const [headerError, setHeaderError] = useState(false);
    const [blockError, setBlockError] = useState(false);

    const onPreviewHandler = useCallback(() => {
        setHeaderError(false);
        setBlockError(false);
        if (!state?.img || !state?.title) {
            setHeaderError(true);
        } else if (!state?.blocks.length) {
            setBlockError(true);
        } else {
            onPreviewButtonClick();
        }
    }, [onPreviewButtonClick, state?.blocks, state?.img, state?.title]);

    const onPublishHandler = useCallback(() => {
        setHeaderError(false);
        setBlockError(false);
        if (!state?.img || !state?.title) {
            setHeaderError(true);
        } else if (!state?.blocks.length) {
            setBlockError(true);
        } else {
            onPublishButtonClick();
        }
    }, [onPublishButtonClick, state?.blocks.length, state?.img, state?.title]);

    return (
        <VStack max align="end" gap="8">
            {headerError && (
                <Text
                    text={t('Article Title or Front Image cannot be empty')}
                    variant="error"
                    bold
                />
            )}
            {blockError && (
                <Text
                    text={t('Article should have at least one content block')}
                    variant="error"
                    bold
                />
            )}
            <ArticleCreateActions
                firstActionButtonText={t('Preview Article')}
                onFirstActionButtonClick={onPreviewHandler}
                secondActionButtonText={t('Publish Article')}
                onSecondActionButtonClick={onPublishHandler}
                className={className}
            />
        </VStack>
    );
};
