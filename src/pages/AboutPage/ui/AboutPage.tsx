import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
    const { t } = useTranslation('about');

    return (
        <Suspense fallback="/">
            <div>
                {t('About Page')}
            </div>
        </Suspense>
    );
};

export default AboutPage;
