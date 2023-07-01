import { memo } from 'react';
import { ArticlesFilters } from '@/widgets/ArticlesFilters';
import { useArticleFilters } from '../../lib/useArticleFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
    const { className } = props;
    const {
        sort,
        order,
        onChangeOrder,
        onChangeSort,
        search,
        onChangeSearch,
        type,
        onChangeType,
    } = useArticleFilters();

    return (
        <ArticlesFilters
            sort={sort}
            type={type}
            onChangeOrder={onChangeOrder}
            onChangeSearch={onChangeSearch}
            onChangeSort={onChangeSort}
            onChangeType={onChangeType}
            order={order}
            search={search}
            className={className}
        />
    );
});
