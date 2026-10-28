import { classNames } from '@/shared/lib/classNames/classNames'
import { Page } from '@/widgets/Page'

import cls from './NotFoundPage.module.scss'


interface NotFoundPageProps {
    className?: string
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return(
        <Page className={classNames(cls.notFoundPage, {}, [className])} dataTestid='NotFoundPage'>
            <p>Страница не найдена :(</p>
        </Page>
    )
}