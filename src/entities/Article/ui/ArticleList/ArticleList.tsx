import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../modal/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
    className?: string,
    articles: Article[],
    isLoading?: boolean,
    view?: ArticleView
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.PLATE ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view}  />
    ))
}

export const ArticleList = (props: ArticleListProps) => {
    const { 
        className,
        articles,
        view = ArticleView.PLATE, 
        isLoading
    } = props


    const renderAtricle = (article: Article) => {
        return (
            <ArticleListItem article={article} view={view} key={article.id} className={cls.card} />
        )
    }

    return(
        <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
            {articles.length > 0 
                ? articles.map(renderAtricle)
                : null 
            }
            {isLoading && getSkeletons(view)}
        </div>
    )
}