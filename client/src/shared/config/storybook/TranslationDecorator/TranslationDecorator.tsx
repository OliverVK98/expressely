// .storybook/preview.js
import React, { Suspense } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Story } from '@storybook/react';
import i18n from '../../i18n/i18n';

// Wrap your stories in the I18nextProvider component
export const TranslationDecorator = (StoryComponent: Story) => (
    // This catches the suspense from components not yet ready (still loading translations)
    // Alternative: set useSuspense to false on i18next.options.react when initializing i18next
    <Suspense fallback={<div />}>
        <I18nextProvider i18n={i18n}>
            <StoryComponent />
        </I18nextProvider>
    </Suspense>
);
