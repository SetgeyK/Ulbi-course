import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton'

export interface ArticleRatingProps {
    className?: string,
    articleId: string
}

const ArticleRating = memo((props: ArticleRatingProps) => {
    const {
        className,
        articleId
    } = props
    const userData = useSelector(getUserAuthData)
    const {data, isLoading} = useGetArticleRating({
        articleId,
        userId: userData?.id ?? ''
    })

    const [rateArticleMutation] = useRateArticle()

    const rating = data?.[0]
    const userId = userData?.id ?? ''

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                userId: userId,
                articleId,
                rate: starsCount,
                feedback,
            })
        } catch (e) {
            console.log(e)
        }
    }, [articleId, rateArticleMutation, userId])

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount)
    }, [handleRateArticle])

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback)
    }, [handleRateArticle])

    if(isLoading) {
        return <Skeleton width={'100%'} height={120}/>
    }

    return(
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title='Оцените статью'
            feedbackTitle='Оставьте свой отзыв о статье, это поможет улучшить качество'
            hasFeedback
        >
        </RatingCard>
    )
})

ArticleRating.displayName = 'ArticleRating'

export default ArticleRating