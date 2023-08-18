import React from 'react';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';
import { AdminAnalytics } from '../AdminAnalytics/AdminAnalytics';
import { AdminControllers } from '../AdminControllers/AdminControllers';

const AdminPage = () => (
    <Page data-testid="AdminPage">
        <VStack gap="16" align="center">
            <AdminAnalytics />
            <AdminControllers />
        </VStack>
    </Page>
);

export default AdminPage;
