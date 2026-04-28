import { memo, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import cls from './ArticleDetailsPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleDetails, ArticleList } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { AddCommentForm } from 'features/addCommentForm'
import { addCommentForAtricle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'widgets/Page/Page'
import { getArticleRecomendations } from '../../model/slices/articleDetailsRecomendationSlice'
import { getArticleRecomendationIsLoading } from '../../model/selectors/recomendations'
import { fetchArticlesRecomendations } from '../../model/services/fetchArticleRecomendations.ts/fetchArticleRecomendations.ts'
import { articleDetaisPageReducer } from '../../model/slices'

interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id:string}>()
    const comments = useSelector(getArticleComments.selectAll)
    const recomendations = useSelector(getArticleRecomendations.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const recomendationsIsLoading = useSelector(getArticleRecomendationIsLoading)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForAtricle(text))
    }, [dispatch])

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])
    
    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
        dispatch(fetchArticlesRecomendations())
    }, [dispatch, id])

    if(!id) {
        return (
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                Статья не найдена :/
            </Page>
        )
    }

    const reducers: ReducersList ={
        articleDetailsPage: articleDetaisPageReducer
    }

    return(
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    Назад к списку
                </Button>
                <ArticleDetails id={id}/>
                <Text size={TextSize.L} title='Рекомендуем' className={cls.commentTitle} />
                <ArticleList
                    className={cls.recomendations}
                    articles={recomendations}
                    isLoading={recomendationsIsLoading}
                    target='_blank'
                />
                <Text size={TextSize.L} title='Комментарии' className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList isLoading={commentsIsLoading} comments={comments}/>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)