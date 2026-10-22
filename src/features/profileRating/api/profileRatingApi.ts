import { Rating } from '@/entities/Rating'
import { rtkApi } from '@/shared/api/rtkApi'

interface GetProfileRatingArg {
    userId: string,
    profileId?: string
}

interface RateProfileArg extends GetProfileRatingArg {
    rate: number,
    feedback?: string
}

const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetProfileRatingArg>({
            query: ({profileId, userId}) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                }
            })
        }),
        rateProfile: build.mutation<void, RateProfileArg>({
            query: (arg) => ({
                url: '/profile-ratings',
                method: 'POST',
                body: arg
            })
        })
    })
})

export const useGetProfileRating = profileRatingApi.useGetArticleRatingQuery
export const useRateProfile = profileRatingApi.useRateProfileMutation