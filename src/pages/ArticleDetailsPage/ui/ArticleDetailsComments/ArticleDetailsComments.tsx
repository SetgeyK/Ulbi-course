import { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import cls from './ArticleDetailsComments.module.scss'
import { CommentList } from 'entities/Comment'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { addCommentForAtricle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { AddCommentForm } from 'features/addCommentForm'
import { VStack } from 'shared/ui/Stack'



interface ArticleDetailsCommentsProps {
    id: string,
    className?: string
}



export const ArticleDetailsComments = ({ id }: ArticleDetailsCommentsProps) => {
    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    }, [dispatch, id])
    
    const onSendComment = useCallback((text: string) => {
        dispatch(addCommentForAtricle(text))
    }, [dispatch])

    return(
        <VStack gap='16' >
            <Text size={TextSize.L} title='Комментарии' className={cls.commentTitle} />
            <AddCommentForm onSendComment={onSendComment}/>
            <CommentList isLoading={commentsIsLoading} comments={comments}/>
        </VStack>
    )
}