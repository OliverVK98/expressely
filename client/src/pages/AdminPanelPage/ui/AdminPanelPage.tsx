import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { Card } from '@/shared/ui/Card';
import { Text } from '@/shared/ui/Text';
import {
    useGetAdminPageArticles,
    useUpdateArticleApprovalStatus,
} from '../model/api/adminPageArticles';
import { ArticleList, ArticleView } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';

const AdminPanelPage = () => {
    const { t } = useTranslation();
    const { data, isLoading, error, refetch } = useGetAdminPageArticles();
    const [approveArticleWithId] = useUpdateArticleApprovalStatus();

    const handleApproveArticle = useCallback(
        async (id: number) => {
            await approveArticleWithId(id);
            refetch();
        },
        [approveArticleWithId, refetch],
    );

    return (
        <Page data-testid="AdminPanelPage">
            <VStack gap="16">
                <Card max padding="16">
                    <Text
                        text={t('New user articles pending approval')}
                        align="center"
                        bold
                    />
                </Card>
                <ArticleList
                    articles={data}
                    isLoading={isLoading}
                    view={ArticleView.BIG}
                    isAdmin
                    onApproveClick={handleApproveArticle}
                />
            </VStack>
        </Page>
    );
};

export default AdminPanelPage;
