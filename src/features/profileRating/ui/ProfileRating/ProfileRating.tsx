import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RatingCard } from '@/entities/Rating'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton'
import { useGetProfileRating, useRateProfile } from '../../api/profileRatingApi'
import { getProfileForm } from '@/features/editableProfileCard/model/selectors/getProfileForm/getProfileForm'

export interface ProfileRatingProps {
    className?: string,
    profileId?: string
}

const ProfileRating = memo((props: ProfileRatingProps) => {
    const {
        className,
        profileId
    } = props
    const userData = useSelector(getUserAuthData)
    const profile = useSelector(getProfileForm)
    const {data, isLoading} = useGetProfileRating({
        profileId,
        userId: userData?.id ?? ''
    })

    const [rateProfileMutation] = useRateProfile()

    const rating = data?.[0]
    const userId = userData?.id ?? ''

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateProfileMutation({
                userId: userId,
                profileId,
                rate: starsCount,
                feedback,
            })
        } catch (e) {
            console.log(e)
        }
    }, [profileId, rateProfileMutation, userId])

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount)
    }, [handleRateArticle])

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback)
    }, [handleRateArticle])

    if(isLoading) {
        return <Skeleton width={'100%'} height={120}/>
    }

    if(!profile) {
        return null
    }


    return(
        <RatingCard
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
            className={className}
            title='Оцените Профиль'
            feedbackTitle='Оставьте свой отзыв об этом профиле'
            hasFeedback
        >
        </RatingCard>
    )
})

ProfileRating.displayName = 'ProfileRating'

export default ProfileRating