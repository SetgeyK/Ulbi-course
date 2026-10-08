import { memo, ReactNode } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { useTheme } from 'app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useModal } from 'shared/lib/hooks/useModal/useModal'

interface DrawerProps {
    children: ReactNode,
    className?: string,
    isOpen?: boolean,
    onClose?: () => void,
    lazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        children,
        className,
        isOpen,
        onClose,
        lazy
    } = props
    const { theme } = useTheme()
    const {
        close,
        isClosing,
        isMounted
    } = useModal({animationDelay: 200, onClose: onClose, isOpen: isOpen})

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    if(lazy && !isMounted) {
        return null
    }

    return(
        <Portal>
            <div className={classNames(cls.drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick ={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
})

Drawer.displayName = 'Drawer'