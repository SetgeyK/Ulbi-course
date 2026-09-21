import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import { Comment } from '../../model/types/comment'
import { VStack } from 'shared/ui/Stack'

interface CommentListProps {
    className?: string,
    comments?: Comment[],
    isLoading?: boolean
}

export const CommentList = (props: CommentListProps) => {
    const {
        isLoading,
        className,
        comments
    } = props

    if(isLoading) {
        return (
            <VStack gap='16' max className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        )
    }

    return(
        <VStack gap='16' max className={classNames('', {}, [className])}>
            {comments?.length
                ? comments.map(comment => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        comment={comment}
                    />
                ))
                : <Text text='Комментарии отсутствуют' />
            }
        </VStack>
    )
}