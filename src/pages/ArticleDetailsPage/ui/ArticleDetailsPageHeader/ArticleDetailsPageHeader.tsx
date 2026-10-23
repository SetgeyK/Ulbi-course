import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { getArticleDetailsData } from '@/entities/Article'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'

import { getCanEditArticle } from '../../model/selectors/article'


interface ArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = ({ className }: ArticleDetailsPageHeaderProps) => {
    const navigate = useNavigate()
    const canUserEdit = useSelector(getCanEditArticle)
    const article = useSelector(getArticleDetailsData)

    const onBackToList = useCallback(() => {
        navigate(getRouteArticles())
    }, [navigate])

    const onEditArticle = useCallback(() => {
        if(article) {
            navigate(getRouteArticleEdit(article.id))
        }
    }, [navigate, article])

    return(
        <HStack max justify='between' className={classNames('', {}, [className])}>
            <Button theme={ButtonTheme.OUTLINE} onClick={onBackToList}>
                Назад к списку
            </Button>
            {canUserEdit && <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onEditArticle}>
                Редактировать
            </Button>}
        </HStack>
    )
}