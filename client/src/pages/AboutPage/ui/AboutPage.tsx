import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';

const AboutPage = () => {
    const { t } = useTranslation();

    return (
        <Suspense fallback="/">
            <Page data-testid="AboutPage">{t('asd')}</Page>
        </Suspense>
    );
};

export default AboutPage;
