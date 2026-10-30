import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'

import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Page } from '@/widgets/Page'

import cls from './ArticlesPage.module.scss'
import { getArticlesPageError } from '../../modal/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../../modal/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initAtriclesPage } from '../../modal/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../../modal/slices/articlesPageSlice'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'


interface ArticlesPageProps {
    className?: string
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
  const dispatch = useAppDispatch()
  const error = useSelector(getArticlesPageError)
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
          <Page className={classNames(cls.articlesPage, {}, [className])} onScrollEnd={onLoadNextPart} dataTestid='ArticlesPage' >
              <ArticlesPageFilters />
              <ArticleInfiniteList />
          </Page>
      </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)