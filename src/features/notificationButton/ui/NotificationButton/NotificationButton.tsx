import { memo, useState, useCallback } from 'react';
import { MobileView, BrowserView } from 'react-device-detect';

import { NotificationList } from '@/entities/Notification';
import NotificationDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

import cls from './NotificationButton.module.scss';

interface NotificationButtonProps {
    className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    const trigger = (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ButtonDeprecated theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
                    <IconDeprecated Svg={NotificationDeprecated} width={20} height={20} inverted></IconDeprecated>
                </ButtonDeprecated>
            }
            on={<Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />}
        />
    );

    return (
        <>
            <BrowserView>
                <ToggleFeatures
                    feature="isAppRedesigned"
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.notificationButton, {}, [className])}
                            direction="bottom-left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                    on={
                        <Popover
                            className={classNames(cls.notificationButton, {}, [className])}
                            direction="bottom-left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                />
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </>
    );
});

NotificationButton.displayName = 'NotificationButton';
