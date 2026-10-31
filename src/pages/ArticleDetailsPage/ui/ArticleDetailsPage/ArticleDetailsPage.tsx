import { memo } from 'react'
import { useParams } from 'react-router'

import { ArticleDetails } from '@/entities/Article'
import { ArticleRating } from '@/features/articleRating'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { VStack } from '@/shared/ui/Stack'
import { Page } from '@/widgets/Page'

import cls from './ArticleDetailsPage.module.scss'
import { articleDetaisPageReducer } from '../../model/slices'
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'


interface ArticleDetailsPageProps {
    className?: string
}

const ArticleDetailsPage = ({ className }: ArticleDetailsPageProps) => {
    const { id } = useParams<{id:string}>()
    

    if(!id) {
        return (
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                Статья не найдена :/
            </Page>
        )
    }

    const reducers: ReducersList ={
        articleDetailsPage: articleDetaisPageReducer
    }

    return(
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                <VStack gap='16' max>
                    <ArticleDetailsPageHeader />
                    <ArticleDetails id={id}/>
                    <ArticleRating articleId={id}/>
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)