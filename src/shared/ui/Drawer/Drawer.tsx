import { memo, ReactNode, useCallback, useEffect } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Drawer.module.scss'
import { useTheme } from '@/app/providers/ThemeProvider'
import { Portal } from '../Portal/Portal'
import { Overlay } from '../Overlay/Overlay'
import { useAnimationLibs } from '@/shared/lib/components/AnimationProvider'

interface DrawerProps {
    children: ReactNode,
    className?: string,
    isOpen?: boolean,
    onClose?: () => void,
    lazy?: boolean
}

const height = window.innerHeight - 100

const DrawerContent = memo((props: DrawerProps) => {
    const {
        children,
        className,
        isOpen,
        onClose
    } = props
    const { theme } = useTheme()
    const {
        Spring,
        Gesture
    } = useAnimationLibs()

    const [{ y }, api] = Spring.useSpring(() => ({ y: height }))

    const openDrawer = useCallback(() => {
        api.start({y:0, immediate: false})
    }, [api])

    useEffect(() => {
        if(isOpen) {
            openDrawer()
        }
    }, [api, isOpen, openDrawer])

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: {...Spring.config.stiff, velocity},
            onResolve: onClose
        })
    }

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [,vy],
            direction: [, dy],
            offset: [, oy],
            cancel
        }) => {
            if(oy < -70) cancel()
            
            if(last) {
                if (oy > height*0.5 || (vy > 0.5 && dy > 0)) {
                    close()
                } else {
                    openDrawer()
                }
            } else {
                api.start({ y: oy, immediate: true })
            }
        },
        { 
            from: () => [0, y.get()], filterTaps: true, bounds: {top:0}, rubberband: true
        }
    )

    const display = y.to((py) => (py < height ? 'block' : 'none'))
    const overlayOpacity = y.to([0, height], [1,0])

    return (
        <Portal>
            <Spring.a.div 
            className={classNames(cls.drawer, { [cls.opened]: isOpen }, [className, theme, 'app_drawer'])}
            style={{ display }}
        >
                <Spring.a.div style={{ opacity: overlayOpacity }} className={cls.overlayWrapper}>
                    <Overlay onClick={close}/>
                </Spring.a.div>
                <Spring.a.div
                    className={cls.sheet}
                    style={{ y, bottom: `calc(-100vh + ${height - 100}px)` }}
                    {...bind()}
            >
                    <div className={cls.handle} />
                    {children}
                </Spring.a.div>
            </Spring.a.div>
        </Portal>
    )
})

export const Drawer = memo((props: DrawerProps) => {
    const {isLoaded} = useAnimationLibs()

    if(!isLoaded) {
        return null
    }

    return (
        <DrawerContent {...props}/>
    )
})

DrawerContent.displayName = 'DrawerContent'
Drawer.displayName = 'Drawer'