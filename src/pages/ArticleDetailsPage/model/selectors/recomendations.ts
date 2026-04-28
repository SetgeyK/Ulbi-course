import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecomendationIsLoading = (state: StateSchema) => state.articleDetailsPage?.recomendations.isLoading
export const getArticleRecomendationError = (state: StateSchema) => state.articleDetailsPage?.recomendations.error