
import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleList.module.scss'
import { Article, ArticleView } from '../../modal/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import { Text, TextSize } from 'shared/ui/Text/Text'

import {
    RowComponentProps,
    Grid,
    CellComponentProps,
} from 'react-window'

interface ArticleListProps {
    className?: string,
    articles: Article[],
    isLoading?: boolean,
    view?: ArticleView,
    target?: HTMLAttributeAnchorTarget,
    onLoadNextPart?: () => void 
}

interface ArticleRowProps {
    articles: Article[],
    view: ArticleView,
    target?: HTMLAttributeAnchorTarget
}

interface GridCellData {
    articles: Article[];
    view: ArticleView;
    itemsPerRow: number;
    totalItemCount: number;
    target?: HTMLAttributeAnchorTarget;
    isLoading?: boolean
}

const getSkeletons = (view: ArticleView) => {
    return new Array(view === ArticleView.PLATE ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton className={cls.card} key={index} view={view}  />
    ))
}

const RowComponent = ({
        index,
        style,
        articles,
        view,
        target
    }: RowComponentProps<ArticleRowProps>) => {
        const article = articles[index]

        if (!article) return null

        return (
            <div style={style}>
                <ArticleListItem
                    article={article}
                    view={view}
                    className={cls.card}
                    target={target}
                />
            </div>
        )
    }

    const Cell = ({
            columnIndex,
            rowIndex,
            style,
            articles,
            view,
            itemsPerRow,
            totalItemCount,
            isLoading,
            target
        }: CellComponentProps<GridCellData>) => {
        const itemIndex = rowIndex * itemsPerRow + columnIndex
        const item = articles[itemIndex]

        const isSkeletonSlot = !item && isLoading && itemIndex < totalItemCount
        
        if(!item && !isSkeletonSlot) return null
        return (
            <div style={{...style, paddingRight: '20px', paddingBottom: '20px', boxSizing: 'border-box'}}>
                {isSkeletonSlot ? (
                    <ArticleListItemSkeleton view={view} />
                ) : (
                    <ArticleListItem 
                    article={item} 
                    view={view} 
                    className={cls.card} 
                    target={target} 
                />
                )}
            </div>
        )
    } 

export const ArticleList = memo((props: ArticleListProps) => {
    const { 
        className,
        articles = [],
        view = ArticleView.PLATE, 
        isLoading,
        target,
        onLoadNextPart
    } = props


    // const renderAtricle = (article: Article) => {
    //     return (
    //         <ArticleListItem article={article} view={view} key={article.id} className={cls.card} target={target} />
    //     )
    // }

    // trying to make a grid

    const ITEMS_PER_ROW = view === ArticleView.PLATE ? 3 : 1
    const skeletonCount = view === ArticleView.PLATE ? 9 : 3
    const totalItemCount = articles.length + (isLoading ? skeletonCount : 0)
    const rowCount = Math.ceil(totalItemCount / ITEMS_PER_ROW)
    

    const cellProps = useMemo<GridCellData>(() => ({
        articles,
        view,
        target,
        itemsPerRow: ITEMS_PER_ROW,
        totalItemCount,
        isLoading
    }), [articles, view, target, ITEMS_PER_ROW, totalItemCount, isLoading])

    const handleScroll = (event: React.UIEvent<HTMLDivElement>
    ) => {
        if (!onLoadNextPart || isLoading) return

        const {scrollHeight, clientHeight, scrollTop} = event.currentTarget
        const isBottomReached = scrollHeight - scrollTop <= clientHeight + 150
        if (isBottomReached) {
            onLoadNextPart()
        }
    }

    //

    const rowProps: ArticleRowProps = {
        articles,
        view,
        target
    };

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
                <Text text='Статьи не найдены' size={TextSize.L} />
            </div>
        )
    }

    return(
        // <div 
        //     className={classNames(cls.articleList, {}, [className, cls[view]])}
        //     style={{height: '75vh', width: '100%', overflowY: 'auto', position: 'relative'}}
        // >
        //     <List
        //     rowComponent={RowComponent}
        //     rowCount={articles.length}
        //     rowHeight={view === ArticleView.PLATE ? 350 : 700}
        //     rowProps={rowProps}
        //     />
        //     {isLoading && getSkeletons(view)}
        // </div>
        <div className={classNames(cls.articleList, {}, [className, cls[view]])}
            style={{height: '700px', width: '100%', position: 'relative'}}
        >
            <Grid
            columnCount={ITEMS_PER_ROW}
            columnWidth={view === ArticleView.PLATE ? 250 : 1000}
            rowCount={rowCount}
            rowHeight={view === ArticleView.PLATE ? 350 : 700}
            cellComponent={Cell} 
            cellProps={cellProps}
            onScroll={handleScroll}
            />
        </div>


        // <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        //     {articles.length > 0 
        //         ? articles.map(renderAtricle)
        //         : null 
        //     }
        //     {isLoading && getSkeletons(view)}
        // </div>
    )
})

ArticleList.displayName = 'ArticleList'
