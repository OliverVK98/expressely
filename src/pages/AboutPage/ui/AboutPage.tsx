import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'widgets/Page';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <Suspense fallback="/">
            <Page>{t('About Page')}</Page>
        </Suspense>
    );
};

export default AboutPage;
