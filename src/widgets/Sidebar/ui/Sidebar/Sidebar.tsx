import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { memo, useMemo, useState } from 'react'
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher'
import { Button, ButtonsSize, ButtonTheme } from 'shared/ui/Button/Button'
import { SidebarItemsList } from '../../model/Items'
import { SidebarItem } from '../SidebarItem/SidebarItem'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapset] = useState(false)

    const itemsList = useMemo(() => {
        return (SidebarItemsList.map((item) => (
            <SidebarItem 
                item={item}
                collapsed={collapsed}
                key={item.path}
            />
        ))
    )}, [collapsed])

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
                {itemsList}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </div>
    )
})

Sidebar.displayName = 'Sidebar'