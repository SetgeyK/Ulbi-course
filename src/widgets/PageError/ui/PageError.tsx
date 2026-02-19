import { classNames } from 'shared/lib/classNames/classNames'
import cls from './PageError.module.scss'

interface PageErrorProps {
    className?: string
}

export const PageError = ({ className }: PageErrorProps) => {
    const reloadPage = () => {
        location.reload()
    }

    return(
        <div className={classNames(cls.pageError, {}, [className])}>
            <p>Произошла непредвиденная ошибка</p>
            <button onClick={reloadPage}>Обновить страницу</button>
        </div>
    )
}