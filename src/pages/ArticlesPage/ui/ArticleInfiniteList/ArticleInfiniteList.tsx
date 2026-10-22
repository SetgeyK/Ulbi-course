import { memo } from 'react'
import { useSelector } from 'react-redux'

import { ArticleList } from '@/entities/Article'
import { Text } from '@/shared/ui/Text'

import cls from './ArticleInfiniteList.module.scss'
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../modal/selectors/articlesPageSelectors'
import { gerArticles } from '../../modal/slices/articlesPageSlice'


export const ArticleInfiniteList = memo(() => {
    const articles = useSelector(gerArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)

    if(error) {
        return <Text text='Произошла ошибка' />
    }
    
    return(
        <ArticleList
            className={cls.list}
            view={view}
            articles={articles}
            isLoading={isLoading}
        />
    )
})

ArticleInfiniteList.displayName = 'ArticleInfiniteList'