import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page';

const MainPage = () => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {t('Main Page')}

        </Page>
    );
};

export default MainPage;
