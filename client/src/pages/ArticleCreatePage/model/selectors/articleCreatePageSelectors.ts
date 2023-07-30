import { buildSelector } from '@/shared/lib/store';

export const [useArticleCreatePageTypes] = buildSelector(
    (state) => state.articleCreatePage?.type || [],
);

export const [useArticleCreatePageTitle] = buildSelector(
    (state) => state.articleCreatePage?.title || '',
);

export const [useArticleCreatePageSubtitle] = buildSelector(
    (state) => state.articleCreatePage?.subtitle || '',
);

export const [useArticleCreatePageImg] = buildSelector(
    (state) => state.articleCreatePage?.img || '',
);

export const [useArticleCreatePageBlocks] = buildSelector(
    (state) => state.articleCreatePage?.blocks || [],
);

export const [useArticleCreatePageState] = buildSelector(
    (state) => state.articleCreatePage,
);
