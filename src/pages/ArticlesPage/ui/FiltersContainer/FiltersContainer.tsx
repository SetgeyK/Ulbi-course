import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
    className?: string;
}

export const FiltersContainer = ({ className }: FiltersContainerProps) => {
    const { order, search, type, sort, onChangeOrder, onChangeSearch, onChangeSort, onChangeType } =
        useArticlesFilters();
    return (
        <ArticlesFilters
            className={className}
            order={order}
            search={search}
            sort={sort}
            type={type}
            onChangeOrder={onChangeOrder}
            onChangeSort={onChangeSort}
            onChangeSearch={onChangeSearch}
            onChangeType={onChangeType}
        />
    );
};
