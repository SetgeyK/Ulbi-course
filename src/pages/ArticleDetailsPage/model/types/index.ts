import { ArticleDetailsCommentsSchema } from './ArticleDetailsCommentSchema';
import { ArticleDetailsRecomendationSchema } from './ArticleDetailsRecomendationSchema';

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema,
    recomendations: ArticleDetailsRecomendationSchema
}