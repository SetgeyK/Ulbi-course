export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails'
export { articleDetailsActions, articleDetailsReducer } from './modal/slice/articleDetailsSlice'
export type { ArticleDetailsSchema } from './modal/types/articleDetailsSchema'

export type { Article } from './modal/types/article'
export { ArticleView, ArticleSortFields, ArticleType } from './modal/consts/articleConsts'
export { ArticleList } from './ui/ArticleList/ArticleList'
export { getArticleDetailsData } from './modal/selectors/articleDetails'