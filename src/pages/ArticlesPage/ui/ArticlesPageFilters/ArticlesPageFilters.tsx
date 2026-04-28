import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPageFilters.module.scss'
import { ArticleView, ArticleViewSelector, ArticleSortSelector, ArticleSortFields, ArticleType, ArticleTypeTabs } from 'entities/Article'
import { getArticlesPageOrder, getArticlesPageSearch, getArticlesPageSort, getArticlesPageType, getArticlesPageView } from '../../modal/selectors/articlesPageSelectors'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { articlesPageAction } from '../../modal/slices/articlesPageSlice'
import { Card } from 'shared/ui/Card/Card'
import { Input } from 'shared/ui/Input/Input'
import { SortOrder } from 'shared/types'
import { fetchArticlesList } from '../../modal/services/fetchArticlesList/fetchArticlesList'
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce'

interface ArticlesPageFiltersProps {
    className?: string,
}

export const ArticlesPageFilters = ({ className }: ArticlesPageFiltersProps) => {
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)
    const order = useSelector(getArticlesPageOrder)
    const sort = useSelector(getArticlesPageSort)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({replace: true}))
    }, [dispatch])

    const debounceFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesPageAction.setView(view))
    }, [dispatch])

    const onChangeOrder = useCallback((newOrder: SortOrder) => {
        dispatch(articlesPageAction.setOrder(newOrder))
        dispatch(articlesPageAction.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSort = useCallback((newSort: ArticleSortFields) => {
        dispatch(articlesPageAction.setSort(newSort))
        dispatch(articlesPageAction.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    const onChangeSearch = useCallback((search: string) => {
        dispatch(articlesPageAction.setSearch(search))
        dispatch(articlesPageAction.setPage(1))
        debounceFetchData()
    }, [dispatch,debounceFetchData])

    const onChangeType = useCallback((value: ArticleType) => {
        dispatch(articlesPageAction.setType(value))
        dispatch(articlesPageAction.setPage(1))
        fetchData()
    }, [dispatch, fetchData])

    return(
        <div className={classNames(cls.articlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper} >
                <ArticleSortSelector 
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />
                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>
            <Card className={cls.search}>
                <Input
                    value={search}
                    placeholder='Поиск'
                    onChange={onChangeSearch}
                />
            </Card>
            <ArticleTypeTabs
                className={cls.tabs}
                value={type}
                onChangeType={onChangeType}
            />
        </div>
    )
}