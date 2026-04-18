import { memo, useCallback, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import cls from './ArticleDetailsPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { Text } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { useSelector } from 'react-redux'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { AddCommentForm } from 'features/addCommentForm'
import { addCommentForAtricle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { Page } from 'shared/ui/Page/Page'

interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id:string}>()
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
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
    }, [dispatch, id])

    if(!id) {
        return (
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                Статья не найдена :/
            </Page>
        )
    }

    const reducers: ReducersList ={
        articleDetailsComments: articleDetailsCommentsReducer
    }

    return(
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                    Назад к списку
                </Button>
                <ArticleDetails id={id}/>
                <Text title='Комментарии' className={cls.commentTitle} />
                <AddCommentForm onSendComment={onSendComment}/>
                <CommentList isLoading={commentsIsLoading} comments={comments}/>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)