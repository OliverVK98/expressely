import { buildSelector } from '@/shared/lib/store';

export const [useArticleEditPageDetails] = buildSelector(
    (state) => state.articleEditPage?.article,
);

export const [useArticleEditPageIsLoading] = buildSelector(
    (state) => state.articleEditPage?.isLoading,
);

export const [useArticleEditPageError] = buildSelector(
    (state) => state.articleEditPage?.error,
);

export const [useArticleEditPageState] = buildSelector(
    (state) => state.articleEditPage,
);
