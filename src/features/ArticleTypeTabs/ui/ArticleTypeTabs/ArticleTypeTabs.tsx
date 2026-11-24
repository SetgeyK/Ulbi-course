import { useCallback, useMemo } from 'react';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { TabItem, Tabs as TabDeprecated } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
    className?: string;
    value: ArticleType;
    onChangeType: (type: ArticleType) => void;
}

export const ArticleTypeTabs = ({ className, value, onChangeType }: ArticleTypeTabsProps) => {
    const typeTabs = useMemo<TabItem[]>(
        () => [
            {
                value: ArticleType.IT,
                content: 'AйТи',
            },
            {
                value: ArticleType.ECONOMICS,
                content: 'Экономика',
            },
            {
                value: ArticleType.SCIENCE,
                content: 'Наука',
            },
            {
                value: ArticleType.ALL,
                content: 'Все статьи',
            },
        ],
        [],
    );

    const onTypeClick = useCallback(
        (tab: TabItem) => {
            onChangeType(tab.value as ArticleType);
        },
        [onChangeType],
    );

    return (
        <ToggleFeatures
            feature={'isAppRedesigned'}
            on={
                <Tabs
                    className={classNames('', {}, [className])}
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTypeClick}
                    direction={'column'}
                />
            }
            off={
                <TabDeprecated
                    className={classNames('', {}, [className])}
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTypeClick}
                />
            }
        />
    );
};
