// .storybook/preview.js
import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'shared/config/i18n/i18n';
import { Story } from '@storybook/react';

// Wrap your stories in the I18nextProvider component
export const TranslationDecorator = (story: () => Story) => (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div />}>
        <I18nextProvider i18n={i18n}>
            {
                story()
            }
        </I18nextProvider>
    </Suspense>
);
