import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import cls from './ArticlesPageFilters.module.scss';
import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface ArticlesPageFiltersProps {
    className?: string;
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {
    const { order, search, type, sort, view, onChangeOrder, onChangeSearch, onChangeSort, onChangeView, onChangeType } =
        useArticlesFilters();

    return (
        <div className={classNames(cls.articlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input value={search} placeholder="Поиск" onChange={onChangeSearch} />
            </Card>
            <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
        </div>
    );
};
