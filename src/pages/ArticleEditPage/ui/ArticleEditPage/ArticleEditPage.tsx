import { useParams } from 'react-router'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticleEditPage.module.scss'
import { Page } from 'widgets/Page/Page'

interface ArticleEditPageProps {
    className?: string
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const {id} = useParams<{id: string}>()
    const isEdit = Boolean(id)
    return(
        <Page className={classNames(cls.articleEditPage, {}, [className])}>
            {isEdit ? 'Edit Page' : 'Create Page'}
        </Page>
    )
}

export default ArticleEditPage