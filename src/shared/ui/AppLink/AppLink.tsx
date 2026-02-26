import { Link, LinkProps } from 'react-router'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'
import { memo, ReactNode } from 'react'

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppLinkProps extends LinkProps {
    className?: string,
    theme?: AppLinkTheme,
    children?: ReactNode
}

export const AppLink = memo((props: AppLinkProps) => {
    const { className, to, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props
    return(
        <Link 
            to={to}
            className={classNames(cls.appLink, {}, [className, cls[theme]])}
            {...otherProps}
        >
            {children}
        </Link>
    )
})

AppLink.displayName = 'Applink'