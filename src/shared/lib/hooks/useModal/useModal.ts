import { useState, useEffect, useRef, useCallback } from 'react'

interface useModalProps {
    onClose?: () => void,
    isOpen?: boolean,
    animationDelay: number,

}

export function useModal(props: useModalProps) {
    const {
        animationDelay,
        onClose,
        isOpen,
    } = props

    const [isClosing, setIsClosing] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    const close = useCallback(() => {
        if(onClose) {
            setIsClosing(true)
            timerRef.current = setTimeout(() => {
                onClose()
                setIsClosing(false)
            }, animationDelay)
        }
    }, [onClose, animationDelay])

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if(e.key === 'Escape') {
            close()
        }
    }, [close])

    useEffect(() => {
        if(isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsMounted(true)
        }
    }, [isOpen])

    useEffect(() => {
        if(isOpen) {
            window.addEventListener('keydown', onKeyDown)
        }
        return () => {
            if(timerRef.current) {
                clearTimeout(timerRef.current)
            }
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [isOpen, onKeyDown])

    return { isClosing, isMounted, close }
}