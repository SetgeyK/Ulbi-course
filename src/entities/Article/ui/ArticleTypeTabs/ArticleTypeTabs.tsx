import { useCallback, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { TabItem, Tabs } from 'shared/ui/Tabs/Tabs'
import { ArticleType } from 'entities/Article/modal/types/article'

interface ArticleTypeTabsProps {
    className?: string,
    value: ArticleType,
    onChangeType: (type: ArticleType) => void
}

export const ArticleTypeTabs = ({ className, value, onChangeType }: ArticleTypeTabsProps) => {
    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.IT,
            content: 'AйТи'
        },
        {
            value: ArticleType.ECONOMICS,
            content: 'Экономика'
        },
        {
            value: ArticleType.SCIENCE,
            content: 'Наука'
        },
        {
            value: ArticleType.ALL,
            content: 'Все статьи'
        }
    ], [])

    const onTypeClick = useCallback((tab: TabItem) => {
            onChangeType(tab.value as ArticleType)
    }, [onChangeType])

    return(
        <Tabs
            className={classNames('', {}, [className])}
            tabs={typeTabs}
            value={value}
            onTabClick={onTypeClick}
        />
    )
}