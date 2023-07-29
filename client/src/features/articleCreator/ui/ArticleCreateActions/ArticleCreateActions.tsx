import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ArticleCreateActionsProps {
    className?: string;
    onPreviewHandler: () => void;
    onPublishHandler: () => void;
}

export const ArticleCreateActions = memo((props: ArticleCreateActionsProps) => {
    const { className, onPublishHandler, onPreviewHandler } = props;
    const { t } = useTranslation();

    return (
        <HStack
            max
            justify="end"
            gap="8"
            className={classNames('', {}, [className])}
        >
            <Button onClick={onPreviewHandler}>{t('Preview article')}</Button>
            <Button color="success" onClick={onPublishHandler}>
                {t('Publish article')}
            </Button>
        </HStack>
    );
});
