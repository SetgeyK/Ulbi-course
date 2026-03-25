import { memo } from 'react'
import { useParams } from 'react-router'
import cls from './ArticleDetailsPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleDetails } from 'entities/Article'

interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id:string}>()
    if(!id) {
        return (
            <div className={classNames(cls.articleDetailsPage, {}, [className])}>
                Статья не найдена :/
            </div>
        )
    }
    return(
        <div className={classNames(cls.articleDetailsPage, {}, [className])}>
            <ArticleDetails id={id}/>
        </div>
    )
}

export default memo(ArticleDetailsPage)