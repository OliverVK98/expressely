import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Page } from '@/widgets/Page';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCreatePageReducer } from '../..';
import { ArticlePreviewModal } from '../ArticlePreviewModal/ArticlePreviewModal';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleCreatePageSidebar } from '../ArticleCreatePageSidebar/ArticleCreatePageSidebar';
import { ArticleCreateHeaderContainer } from '../../uiNew/ArticleCreateHeaderContainer/ArticleCreateHeaderContainer';
import { ArticleBlockCreatorContainer } from '../../uiNew/ArticleBlockCreatorContainer/ArticleBlockCreatorContainer';
import { ArticleCreateActionsContainer } from '../../uiNew/ArticleCreateActionsContainer/ArticleCreateActionsContainer';

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
                <ArticleCreateHeaderContainer />
                <ArticleBlockCreatorContainer />
                <ArticleCreateActionsContainer />
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
