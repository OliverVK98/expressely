import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { ArticleBlockCreator } from '../ArticleBlockCreator/ArticleBlockCreator';
import { Article, ArticleBlock, ArticleType } from '@/entities/Article';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { ArticleCreatePageHeader } from '../ArticleCreatePageHeader/ArticleCreatePageHeader';
import { Button } from '@/shared/ui/Button';
import { ArticlePreviewModal } from '../ArticlePreviewModal/ArticlePreviewModal';

interface ArticleCreatePageProps {
    className?: string;
}

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;
    const { t } = useTranslation();
    const [header, setHeader] = useState<Partial<Article>>({
        title: '',
        subtitle: '',
        img: '',
        type: [ArticleType.All],
    });
    const [blocks, setBlocks] = useState<ArticleBlock[]>([]);
    const [modalOpen, setModalOpen] = useState(false);

    const onClickModalHandler = useCallback(() => {
        setModalOpen((prev) => !prev);
    }, []);

    return (
        <Page className={className}>
            <VStack gap="16">
                <ArticleCreatePageHeader
                    header={header}
                    setHeader={setHeader}
                />
                <ArticleBlockCreator blocks={blocks} setBlocks={setBlocks} />
                <HStack max justify="end" gap="8">
                    <Button onClick={onClickModalHandler}>
                        {t('Preview article')}
                    </Button>
                    <Button color="success">{t('Publish article')}</Button>
                </HStack>
            </VStack>
            {modalOpen && (
                <ArticlePreviewModal
                    header={header}
                    blocks={blocks}
                    onClose={onClickModalHandler}
                    isOpen={modalOpen}
                />
            )}
        </Page>
    );
});

export default ArticleCreatePage;
