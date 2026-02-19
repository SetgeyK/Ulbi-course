import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { useState } from 'react'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, ButtonsSize, ButtonTheme } from 'shared/ui/Button/Button'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'

import MainPageIcon from 'shared/assets/icons/main-20-20.svg'
import AboutPageIcon from 'shared/assets/icons/about-20-20.svg'

interface SidebarProps {
    className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [collapsed, setCollapset] = useState(false)

    const onToggle = () => {
        setCollapset(prev => !prev)
    }
    return(
        <div 
            className={classNames(cls.sidebar, {[cls.collapsed]: collapsed}, [className])}
        >
            <Button
                className={cls.collapseBtn}
                onClick={onToggle}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                square
                size={ButtonsSize.L}
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                <div className={cls.item}>
                    <AppLink 
                    to={RoutePath.main} 
                    className={cls.item}
                    theme={AppLinkTheme.PRIMARY}
                >
                        <MainPageIcon className={cls.icon} />
                        <span className={cls.link}>
                            Главная
                        </span>
                    </AppLink>
                </div>
                <AppLink
                    to={RoutePath.about}
                    className={cls.item}
                    theme={AppLinkTheme.PRIMARY}
                >
                    <AboutPageIcon className={cls.icon}/>
                    <span className={cls.link}>
                        О сайте
                    </span>
                </AppLink>
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    )
}