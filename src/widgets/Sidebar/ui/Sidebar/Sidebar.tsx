import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/AppLogo';
import { Button, ButtonsSize, ButtonTheme } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';

import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapset] = useState(false);
    const sidebarItemsList = useSelector(getSidebarItems);

    const itemsList = useMemo(() => {
        return sidebarItemsList.map((item) => <SidebarItem item={item} collapsed={collapsed} key={item.path} />);
    }, [collapsed, sidebarItemsList]);

    const onToggle = () => {
        setCollapset((prev) => !prev);
    };

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <aside className={classNames(cls.sidebar, { [cls.collapsed]: collapsed }, [className])}>
                    <Button
                        className={cls.collapseBtn}
                        onClick={onToggle}
                        theme={ButtonTheme.BACKGROUND_INVERTED}
                        square
                        size={ButtonsSize.L}
                    >
                        {collapsed ? '>' : '<'}
                    </Button>
                    <VStack role="navigation" gap="8" className={cls.items}>
                        {itemsList}
                    </VStack>
                    <div className={cls.switchers}>
                        <ThemeSwitcher />
                    </div>
                </aside>
            }
            on={
                <aside className={classNames(cls.sidebarRedesigned, { [cls.collapsed]: collapsed }, [className])}>
                    <AppLogo className={cls.appLogo} />
                </aside>
            }
        />
    );
});

Sidebar.displayName = 'Sidebar';
