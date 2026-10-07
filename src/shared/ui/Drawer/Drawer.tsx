import { memo, ReactNode } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { useTheme } from 'app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

interface DrawerProps {
    children: ReactNode,
    className?: string,
    isOpen?: boolean,
    onClose?: () => void
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        children,
        className,
        isOpen,
        onClose
    } = props
    const { theme } = useTheme()
    const mods: Mods = {
        [cls.opened]: isOpen
    }

    console.log('drawer is opend', isOpen)

    return(
        <Portal>
            <div className={classNames(cls.drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick ={onClose} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
})

Drawer.displayName = 'Drawer'