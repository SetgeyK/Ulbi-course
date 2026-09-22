import { memo, useMemo, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Sidebar.module.scss'
import { ThemeSwitcher } from 'widgets/ThemeSwitcher'
import { Button, ButtonsSize, ButtonTheme } from 'shared/ui/Button/Button'
import { SidebarItem } from '../SidebarItem/SidebarItem'
import { useSelector } from 'react-redux'
import { getSidebarItems } from '../../model/selectors/getSidebarItems'
import { VStack } from 'shared/ui/Stack'

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapset] = useState(false)
    const sidebarItemsList = useSelector(getSidebarItems)

    const itemsList = useMemo(() => {
        return (sidebarItemsList.map((item) => (
            <SidebarItem 
                item={item}
                collapsed={collapsed}
                key={item.path}
            />
        ))
    )}, [collapsed, sidebarItemsList])

    const onToggle = () => {
        setCollapset(prev => !prev)
    }
    return(
        <aside 
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
            <VStack role='navigation' gap='8' className={cls.items}>
                {itemsList}
            </VStack>
            <div className={cls.switchers}>
                <ThemeSwitcher />
            </div>
        </aside>
    )
})

Sidebar.displayName = 'Sidebar'