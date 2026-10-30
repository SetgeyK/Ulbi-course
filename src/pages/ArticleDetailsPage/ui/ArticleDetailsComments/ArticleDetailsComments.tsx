import { Suspense, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { CommentList } from '@/entities/Comment'
import { CommentCard } from '@/entities/Comment'
import { AddCommentForm } from '@/features/addCommentForm'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { VStack } from '@/shared/ui/Stack'
import { Text, TextSize } from '@/shared/ui/Text'

import cls from './ArticleDetailsComments.module.scss'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { addCommentForAtricle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'




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
        <VStack gap='16' max>
            <Text size={TextSize.L} title='Комментарии' className={cls.commentTitle} />
            <Suspense fallback={<CommentCard isLoading/>}>
                <AddCommentForm onSendComment={onSendComment}/>
            </Suspense>
            <CommentList isLoading={commentsIsLoading} comments={comments}/>
        </VStack>
    )
}