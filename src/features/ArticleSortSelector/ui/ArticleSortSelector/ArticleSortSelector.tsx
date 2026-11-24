import { useMemo } from 'react';

import { ArticleSortFields } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';
import { Listbox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import cls from './ArticleSortSelector.module.scss';

interface ArticleSortSelectorProps {
    className?: string;
    sort: ArticleSortFields;
    order: SortOrder;
    onChangeOrder: (newOrder: SortOrder) => void;
    onChangeSort: (newSort: ArticleSortFields) => void;
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props;

    const sortOrderOptions = useMemo<SelectOption<SortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: 'возрастанию',
            },
            {
                value: 'desc',
                content: 'убыванию',
            },
        ],
        [],
    );

    const sortFieldOptions = useMemo<SelectOption<ArticleSortFields>[]>(
        () => [
            {
                value: ArticleSortFields.CREATED,
                content: 'дате создания',
            },
            {
                value: ArticleSortFields.TITLE,
                content: 'названию',
            },
            {
                value: ArticleSortFields.VIEWS,
                content: 'просмотрам',
            },
        ],
        [],
    );

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <div className={classNames(cls.articleSortSelectorRedesigned, {}, [className])}>
                    <VStack gap="8">
                        <Text text="Сортировать по:" />
                        <Listbox items={sortFieldOptions} value={sort} onChange={onChangeSort} />
                        <Listbox items={sortOrderOptions} value={order} onChange={onChangeOrder} />
                    </VStack>
                </div>
            }
            off={
                <div className={classNames(cls.articleSortSelector, {}, [className])}>
                    <Select<ArticleSortFields>
                        label="Сортировать ПО"
                        options={sortFieldOptions}
                        value={sort}
                        onChange={onChangeSort}
                    />
                    <Select<SortOrder>
                        label="по"
                        options={sortOrderOptions}
                        value={order}
                        onChange={onChangeOrder}
                        className={cls.order}
                    />
                </div>
            }
        />
    );
};
