import { memo, useState, useCallback } from 'react'
import { MobileView, BrowserView } from 'react-device-detect'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './NotificationButton.module.scss'
import { Popover } from '@/shared/ui/Popups'
import { Button, ButtonTheme } from '@/shared/ui/Button/Button'
import { Icon } from '@/shared/ui/Icon/Icon'
import { NotificationList } from '@/entities/Notification'
import Notification from '@/shared/assets/icons/notification-20-20.svg'
import { Drawer } from '@/shared/ui/Drawer/Drawer'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    const trigger = (
        <Button theme={ButtonTheme.CLEAR} onClick={onOpenDrawer}>
            <Icon Svg={Notification} inverted></Icon>
        </Button>
    )
    
    return(
        <>
            <BrowserView>
                <Popover
                    className={classNames(cls.notificationButton, {}, [className])}
                    direction='bottom-left'
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>
            <MobileView>
                {trigger}
                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </>
    )
})

NotificationButton.displayName = 'NotificationButton'