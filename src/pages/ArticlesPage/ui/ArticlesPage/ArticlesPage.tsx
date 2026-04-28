import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import cls from './ArticlesPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList } from 'entities/Article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageReducer, gerArticles } from '../../modal/slices/articlesPageSlice'
import { Page } from 'widgets/Page/Page'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../modal/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../../modal/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initAtriclesPage } from '../../modal/services/initArticlesPage/initArticlesPage'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'

interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch()
  const articles = useSelector(gerArticles.selectAll)
  const isLoading = useSelector(getArticlesPageIsLoading)
  const error = useSelector(getArticlesPageError)
  const view = useSelector(getArticlesPageView)
  const [searchParams] = useSearchParams()

  const onLoadNextPart = useCallback(() => {
    dispatch(fetchNextArticlesPage())
  }, [dispatch])

  useEffect(() => {
    if(searchParams) {
      dispatch(initAtriclesPage(searchParams))
    }
  }, [dispatch, searchParams])

  if(error) {
    throw new Error()
  }
  
  return(
      <DynamicModuleLoader reducers={reducers}>
          <Page className={classNames(cls.articlesPage, {}, [className])} onScrollEnd={onLoadNextPart} >
              <ArticlesPageFilters />
              <ArticleList
                className={cls.list}
                view={view}
                articles={articles}
                isLoading={isLoading}
              />
          </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)