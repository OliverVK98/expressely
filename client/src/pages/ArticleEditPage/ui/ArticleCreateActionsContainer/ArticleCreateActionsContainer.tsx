import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleCreateActions } from '@/features/articleCreator';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { useArticleEditPageState } from '../../model/selectors/articleEditPageSelectors';

interface ArticleCreateActionsContainerProps {
    className?: string;
    onPreviewButtonClick: () => void;
    onPublishHandler: () => void;
}

export const ArticleCreateActionsContainer = (
    props: ArticleCreateActionsContainerProps,
) => {
    const { className, onPreviewButtonClick, onPublishHandler } = props;
    const state = useArticleEditPageState();
    const { t } = useTranslation();
    const [error, setError] = useState(false);

    const onPreviewHandler = useCallback(() => {
        setError(false);
        if (!state?.article.img || !state?.article.title) {
            setError(true);
        } else {
            onPreviewButtonClick();
        }
    }, [state?.article, onPreviewButtonClick]);

    return (
        <VStack max align="end" gap="8">
            {error && (
                <Text
                    text={t('Title or Front Image cannot be empty')}
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
