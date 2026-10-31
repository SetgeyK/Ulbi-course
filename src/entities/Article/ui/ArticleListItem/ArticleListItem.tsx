import { HTMLAttributeAnchorTarget, memo } from 'react'

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg'
import { getRouteArticleDetail } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppImage } from '@/shared/ui/AppImage'
import { AppLink } from '@/shared/ui/AppLink'
import { Avatar } from '@/shared/ui/Avatar'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { Card } from '@/shared/ui/Card'
import { Icon } from '@/shared/ui/Icon'
import { Skeleton } from '@/shared/ui/Skeleton'
import { Text } from '@/shared/ui/Text'

import cls from './ArticleListItem.module.scss'
import { ArticleView } from '../../modal/consts/articleConsts'
import { Article, ArticleTextBlock } from '../../modal/types/article'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'


interface ArticleListItemProps {
    className?: string,
    article: Article,
    view: ArticleView,
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo(( props: ArticleListItemProps) => {
    const {
        className,
        article,
        view,
        target
    } = props

    const types = <Text text={article.type.join(', ')} className={cls.types} />
    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    )

    if (view === ArticleView.LIST) {
        const textBlock = article.blocks.find(block => block.type === 'TEXT') as ArticleTextBlock
        return (
            <div 
                className={classNames(cls.articleListItem, {}, [className, cls[view]])}
                data-testid='ArticleListItem'
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />
                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>
                    <Text title={article.title} className={cls.title} />
                    {types}
                    <AppImage
                        src={article.img}
                        className={cls.img}
                        alt={article.title}
                        fallback={<Skeleton width={'100%'} height={250} />}
                    />
                    {textBlock && (
                        <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />
                    )}
                    <div className={cls.footer}>
                        <AppLink to={getRouteArticleDetail(article.id)} target={target}>
                            <Button theme={ButtonTheme.OUTLINE} >
                                Читать далее...
                            </Button>
                        </AppLink>
                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return(
        <AppLink
            to={getRouteArticleDetail(article.id)}
            className={classNames(cls.articleListItem, {}, [className, cls[view]])} target={target}
            data-testid='ArticleListItem'
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage
                        className={cls.img}
                        src={article.img}
                        alt={article.title}
                        fallback={<Skeleton width={200} height={200} />}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper}>
                    {types}
                    {views}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    )
})

ArticleListItem.displayName = 'ArticleListItem'