import { memo } from 'react';
import { ArticleBlockCreator } from '../ArticleBlockCreator/ArticleBlockCreator';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import { ArticleCreatePageHeader } from '../ArticleCreatePageHeader/ArticleCreatePageHeader';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCreatePageReducer } from '../..';
import { ArticlePreviewModal } from '../ArticlePreviewModal/ArticlePreviewModal';
import { ArticleCreateActions } from '../ArticleCreateActions/ArticleCreateActions';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleCreatePageSidebar } from '../ArticleCreatePageSidebar/ArticleCreatePageSidebar';

interface ArticleCreatePageProps {
    className?: string;
}

const reducers: ReducersList = {
    articleCreatePage: articleCreatePageReducer,
};

const ArticleCreatePage = memo((props: ArticleCreatePageProps) => {
    const { className } = props;

    const content = (
        <Page className={className}>
            <VStack gap="16">
                <ArticleCreatePageHeader />
                <ArticleBlockCreator />
                <ArticleCreateActions />
            </VStack>
            <ArticlePreviewModal />
        </Page>
    );

    return (
        <DynamicModuleLoader reducers={reducers} removerAfterUnmount>
            <StickyContentLayout
                content={content}
                right={<ArticleCreatePageSidebar />}
            />
        </DynamicModuleLoader>
    );
});

export default ArticleCreatePage;
