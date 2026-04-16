import { memo, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cls from './ArticlesPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articlesPageAction, articlesPageReducer, gerArticles } from '../../modal/slices/articlesPageSlice'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticlesList } from '../../modal/services/fetchArticlesList'
import { getArticlesPageIsError, getArticlesPageIsLoading, getArticlesPageIsView } from '../../modal/selectors/articlesPageSelectors'

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
  const error = useSelector(getArticlesPageIsError)
  const view = useSelector(getArticlesPageIsView)

  const onChangeView = useCallback((view: ArticleView) => {
    dispatch(articlesPageAction.setView(view))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchArticlesList())
    dispatch(articlesPageAction.initState())
  }, [dispatch])
  
  return(
      <DynamicModuleLoader reducers={reducers}>
          <div className={classNames(cls.articlesPage, {}, [className])}>
              <ArticleViewSelector view={view} onViewClick={onChangeView} />
              <ArticleList view={view} articles={articles} isLoading={isLoading} />
          </div>
      </DynamicModuleLoader>
  )
}

export default memo(ArticlesPage)