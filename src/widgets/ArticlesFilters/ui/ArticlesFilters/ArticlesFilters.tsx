import { ArticleSortFields, ArticleType } from '@/entities/Article';
import { ArticleSortSelector } from '@/features/ArticleSortSelector';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
    className?: string;
    sort: ArticleSortFields;
    order: SortOrder;
    type: ArticleType;
    search: string;
    onChangeSearch: (value: string) => void;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortFields) => void;
    onChangeType: (type: ArticleType) => void;
}

export const ArticlesFilters = (props: ArticlesFiltersProps) => {
    const { className, sort, order, search, type, onChangeOrder, onChangeSearch, onChangeSort, onChangeType } = props;

    return (
        <Card className={classNames(cls.articlesFilters, {}, [className])} padding="24">
            <VStack gap="32">
                <Input value={search} placeholder="Поиск" onChange={onChangeSearch} />
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleTypeTabs className={cls.tabs} value={type} onChangeType={onChangeType} />
            </VStack>
        </Card>
    );
};
