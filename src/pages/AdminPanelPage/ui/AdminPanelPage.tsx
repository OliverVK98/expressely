import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

const AdminPanelPage = () => {
    const { t } = useTranslation('about');

    return (
        <Suspense fallback="/">
            <Page>{t('Admin Page')}</Page>
        </Suspense>
    );
};

export default AdminPanelPage;
