import { useCallback } from 'react'
import { useNavigate } from 'react-router'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleDetailsPageHeader.module.scss'
import { useSelector } from 'react-redux'
import { getCanEditArticle } from 'pages/ArticleDetailsPage/model/selectors/article'
import { getArticleDetailsData } from 'entities/Article'

interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = ({ className }: ArticleDetailsPageHeaderProps) => {
    const navigate = useNavigate()
    const canUserEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles)
    }, [navigate])

    const onEditArticle = useCallback(() => {
        navigate(`${RoutePath.article_details}${article?.id}/edit`)
    }, [navigate, article])

    return(
        <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                Назад к списку
            </Button>
            {canUserEdit && <Button
                className={cls.editBtn}
                theme={ButtonTheme.OUTLINE}
                onClick={onEditArticle}>
                Редактировать
            </Button>}
        </div>
    )
}