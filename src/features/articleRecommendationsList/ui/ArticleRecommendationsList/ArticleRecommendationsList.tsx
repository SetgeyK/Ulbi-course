import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleList } from 'entities/Article'
import { VStack } from 'shared/ui/Stack'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi'

interface ArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: ArticleRecommendationsListProps) => {
    const { className } = props
    const { isLoading, data: articles, error } = useArticleRecommendationsList(3)
    if(isLoading || error || !articles) {
        return null
    }

    return (
        <VStack gap='8' className={classNames('', {}, [className])}>
            <Text size={TextSize.L} title='Рекомендуем' className={''} />
            <ArticleList
                articles={articles}
                isLoading={false}
                target='_blank'
                virtualized={false}
            />
        </VStack>
    )
})

ArticleRecommendationsList.displayName = 'ArticleRecommendationsList'
