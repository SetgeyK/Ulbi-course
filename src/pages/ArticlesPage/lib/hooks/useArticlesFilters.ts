import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { ArticleSortFields, ArticleType, ArticleView } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce';
import { SortOrder } from '@/shared/types/sort';

import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../modal/selectors/articlesPageSelectors';
import { fetchArticlesList } from '../../modal/services/fetchArticlesList/fetchArticlesList';
import { articlesPageAction } from '../../modal/slices/articlesPageSlice';

export function useArticlesFilters() {
    const dispatch = useAppDispatch();
    const view = useSelector(getArticlesPageView);
    const order = useSelector(getArticlesPageOrder);
    const sort = useSelector(getArticlesPageSort);
    const search = useSelector(getArticlesPageSearch);
    const type = useSelector(getArticlesPageType);

    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replace: true }));
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);
    const onChangeView = useCallback(
        (view: ArticleView) => {
            dispatch(articlesPageAction.setView(view));
        },
        [dispatch],
    );

    const onChangeOrder = useCallback(
        (newOrder: SortOrder) => {
            dispatch(articlesPageAction.setOrder(newOrder));
            dispatch(articlesPageAction.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSort = useCallback(
        (newSort: ArticleSortFields) => {
            dispatch(articlesPageAction.setSort(newSort));
            dispatch(articlesPageAction.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageAction.setSearch(search));
            dispatch(articlesPageAction.setPage(1));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onChangeType = useCallback(
        (value: ArticleType) => {
            dispatch(articlesPageAction.setType(value));
            dispatch(articlesPageAction.setPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return {
        order,
        search,
        sort,
        type,
        view,
        onChangeType,
        onChangeSearch,
        onChangeSort,
        onChangeOrder,
        onChangeView,
    };
}
