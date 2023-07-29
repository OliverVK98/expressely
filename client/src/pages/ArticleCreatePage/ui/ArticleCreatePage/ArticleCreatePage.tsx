import { memo } from 'react';
import { Page } from '@/widgets/Page';
import {
    DynamicModuleLoader,
    ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { articleCreatePageReducer } from '../..';
import { ArticlePreview } from '../ArticlePreview/ArticlePreview';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { ArticleCreatePageSidebar } from '../ArticleCreatePageSidebar/ArticleCreatePageSidebar';
import { ArticleCreate } from '../ArticleCreate/ArticleCreate';

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
            <ArticleCreate />
            <ArticlePreview />
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
