import { classNames } from 'shared/lib/classNames/classNames'
import cls from './NotFoundPage.module.scss'
import { Page } from 'widgets/Page/Page'


interface NotFoundPageProps {
    className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return(
        <Page className={classNames(cls.notFoundPage, {}, [className])}>
            <p>Страница не найдена :(</p>
        </Page>
    )
}