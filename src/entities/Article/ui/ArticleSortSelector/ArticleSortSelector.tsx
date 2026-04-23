import { useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleSortSelector.module.scss'
import { Select, SelectOption } from 'shared/ui/Select/Select'
import { ArticleSortFields } from 'entities/Article/modal/types/article'
import { SortOrder } from 'shared/types'

interface ArticleSortSelectorProps {
    className?: string,
    sort: ArticleSortFields,
    order: SortOrder,
    onChangeOrder: (newOrder: SortOrder) => void,
    onChangeSort: (newSort:ArticleSortFields) => void 
}

export const ArticleSortSelector = (props: ArticleSortSelectorProps) => {
    const {
        className,
        sort,
        order,
        onChangeOrder,
        onChangeSort
    } = props

    const sortOrderOptions = useMemo<SelectOption<SortOrder>[]>(() => [
        {
            value: 'asc',
            content: 'возрастанию'
        },
        {
            value: 'desc',
            content: 'убыванию'
        }
    ], [])

    const sortFieldOptions = useMemo<SelectOption<ArticleSortFields>[]>(() => [
        {
            value: ArticleSortFields.CREATED,
            content: 'дате создания'
        },
        {
            value: ArticleSortFields.TITLE,
            content: 'названию'
        },
        {
            value: ArticleSortFields.VIEWS,
            content: 'просмотрам'
        }
    ], [])

    return(
        <div className={classNames(cls.articleSortSelector, {}, [className])}>
            <Select<ArticleSortFields>
                label='Сортировать ПО'
                options={sortFieldOptions}
                value={sort}
                onChange={onChangeSort}
            />
            <Select<SortOrder>
                label='по'
                options={sortOrderOptions}
                value={order}
                onChange={onChangeOrder}
                className={cls.order}
            />
        </div>
    )
}