import { memo } from 'react'
import { useSelector } from 'react-redux'
import cls from './ArticleInfiniteList.module.scss'
import { ArticleList } from 'entities/Article'
import { gerArticles } from '../../modal/slices/articlesPageSlice'
import { getArticlesPageError, getArticlesPageIsLoading, getArticlesPageView } from '../../modal/selectors/articlesPageSelectors'
import { fetchNextArticlesPage } from '../../modal/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { Text } from 'shared/ui/Text/Text'

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
            onLoadNextPart={fetchNextArticlesPage}
        />
    )
})

ArticleInfiniteList.displayName = 'ArticleInfiniteList'