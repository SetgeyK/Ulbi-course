import { ReactNode, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Tabs.module.scss';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    direction?: FlexDirection;
    onTabClick: (tab: TabItem) => void;
}

export const Tabs = (props: TabsProps) => {
    const { className, tabs, value, direction = 'row', onTabClick } = props;

    const clickHandler = useCallback(
        (tab: TabItem) => {
            return () => {
                onTabClick(tab);
            };
        },
        [onTabClick],
    );

    return (
        <Flex className={classNames(cls.tabs, {}, [className])} direction={direction} gap="8" align={'start'}>
            {tabs.map((tab) => {
                const isSelected = tab.value === value;
                return (
                    <Card
                        key={tab.value}
                        className={classNames(cls.tab, { [cls.selected]: isSelected }, [])}
                        variant={isSelected ? 'light' : 'normal'}
                        border={'round_border'}
                        onClick={clickHandler(tab)}
                    >
                        {tab.content}
                    </Card>
                );
            })}
        </Flex>
    );
};
