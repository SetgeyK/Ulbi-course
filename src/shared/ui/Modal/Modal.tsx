import { ReactNode } from 'react'
import cls from './Modal.module.scss'
import useTheme from '@/shared/lib/hooks/useTheme/useTheme'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { classNames, Mods } from '@/shared/lib/classNames/classNames'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'

interface ModalProps {
    className?: string,
    children?: ReactNode,
    isOpen?: boolean,
    onClose?: () => void,
    lazy?: boolean
}

export const Modal = (props: ModalProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy
    } = props

    const {theme} = useTheme()
    const {
        close,
        isClosing,
        isMounted
    } = useModal({animationDelay: 180, onClose: onClose, isOpen: isOpen})

    const mods: Mods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    }

    if(lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className, theme])}>
                <Overlay onClick={close} />
                <div className={cls.content}>
                    {children}
                </div>
            </div>
        </Portal>
    )
}