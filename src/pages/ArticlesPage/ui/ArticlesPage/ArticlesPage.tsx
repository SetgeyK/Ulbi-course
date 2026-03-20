import { memo } from 'react'
import cls from './ArticlesPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'

interface ArticlesPageProps {
    className?: string
}

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    return(
        <div className={classNames(cls.articlesPage, {}, [className])}>
            Articles Page
        </div>
    )
}

export default memo(ArticlesPage)