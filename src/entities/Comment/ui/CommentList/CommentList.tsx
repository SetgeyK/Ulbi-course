import { classNames } from 'shared/lib/classNames/classNames'
import cls from './CommentList.module.scss'
import { Text } from 'shared/ui/Text/Text'
import { CommentCard } from '../CommentCard/CommentCard'
import { Comment } from '../../model/types/comment'

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
            <div className={classNames(cls.commentList, {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </div>
        )
    }

    return(
        <div className={classNames(cls.commentList, {}, [className])}>
            {comments?.length
                ? comments.map(comment => (
                    <CommentCard
                        key={comment.id}
                        isLoading={isLoading}
                        className={cls.comment}
                        comment={comment}
                    />
                ))
                : <Text text='Комментарии отсутствуют' />
            }
        </div>
    )
}