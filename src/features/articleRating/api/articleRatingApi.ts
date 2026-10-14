import { rtkApi } from '@/shared/api/rtkApi'
import { Rating } from '@/entities/Rating'

interface GetAtricleRatingArg {
    userId: string,
    articleId: string
}

interface RateArticleArg extends GetAtricleRatingArg {
    rate: number,
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GetAtricleRatingArg>({
            query: ({articleId, userId}) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                }
            })
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg
            })
        })
    })
})

export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery
export const useRateArticle = articleRatingApi.useRateArticleMutation