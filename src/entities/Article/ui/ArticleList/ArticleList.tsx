
import { HTMLAttributeAnchorTarget, memo } from 'react'

import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text'

import cls from './ArticleList.module.scss'
import { ArticleView } from '../../modal/consts/articleConsts'
import { Article } from '../../modal/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
    className?: string,
    articles: Article[],
    isLoading?: boolean,
    view?: ArticleView,
    target?: HTMLAttributeAnchorTarget,
}

const getSkeletons = (view:  ArticleView) => {
    return new Array(view === ArticleView.PLATE ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view}  />
    ))
}

export const ArticleList = memo((props: ArticleListProps) => {
    const { 
        className,
        articles = [],
        view = ArticleView.PLATE, 
        isLoading,
        target,
    } = props

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
                <Text text='Статьи не найдены' size={TextSize.L} />
            </div>
        )
    }

    return (
        <div
            className={classNames(cls.articleList, {}, [className, cls[view]])}
            data-testid='ArticleList'
        >
            {articles.map(article => (
                <ArticleListItem 
                            article={article}
                            view={view}
                            target={target}
                            key={article.id}
                            className={cls.card}
                        />
                    ))}
            {isLoading && getSkeletons(view)}
        </div>
    )
})

ArticleList.displayName = 'ArticleList'
