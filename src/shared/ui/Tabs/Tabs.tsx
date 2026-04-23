import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Tabs.module.scss'
import { ReactNode, useCallback } from 'react'
import { Card, CardTheme } from '../Card/Card'

export interface TabItem {
    value: string,
    content: ReactNode
}

interface TabsProps {
    className?: string,
    tabs: TabItem[],
    value: string,
    onTabClick: (tab: TabItem) => void
}

export const Tabs = (props: TabsProps) => {
    const {
        className,
        tabs,
        value,
        onTabClick
    } = props

    const clickHandler = useCallback((tab: TabItem) => {
        return () => {
            onTabClick(tab)
        }
    }, [onTabClick])

    return(
        <div className={classNames(cls.tabs, {}, [className])}>
            {tabs.map(tab => (
                <Card
                    key={tab.value}
                    className={cls.tab}
                    theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    onClick={clickHandler(tab)}
                >
                    {tab.content}
                </Card>
            ))}
        </div>
    )
}