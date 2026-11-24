import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';

import { ArticlePageGreeting } from '@/features/articlePageGreeting';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Page } from '@/widgets/Page';

import cls from './ArticlesPage.module.scss';
import { getArticlesPageError } from '../../modal/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../modal/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initAtriclesPage } from '../../modal/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../modal/slices/articlesPageSlice';
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { FiltersContainer } from '../FiltersContainer/FiltersContainer';
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer';

interface ArticlesPageProps {
    className?: string;
}

const reducers: ReducersList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const dispatch = useAppDispatch();
    const error = useSelector(getArticlesPageError);
    const [searchParams] = useSearchParams();

    const onLoadNextPart = useCallback(() => {
        dispatch(fetchNextArticlesPage());
    }, [dispatch]);

    useEffect(() => {
        if (searchParams) {
            dispatch(initAtriclesPage(searchParams));
        }
    }, [dispatch, searchParams]);

    if (error) {
        throw new Error();
    }

    const content = (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            off={
                <Page
                    className={classNames(cls.articlesPage, {}, [className])}
                    onScrollEnd={onLoadNextPart}
                    dataTestid="ArticlesPage"
                >
                    <ArticlesPageFilters />
                    <ArticleInfiniteList />
                    <ArticlePageGreeting />
                </Page>
            }
            on={
                <StickyContentLayout
                    content={
                        <Page
                            className={classNames(cls.articlesPageRedesigned, {}, [className])}
                            onScrollEnd={onLoadNextPart}
                            dataTestid="ArticlesPage"
                        >
                            <ArticleInfiniteList />
                            <ArticlePageGreeting />
                        </Page>
                    }
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                />
            }
        />
    );

    return <DynamicModuleLoader reducers={reducers}>{content}</DynamicModuleLoader>;
};

export default memo(ArticlesPage);
