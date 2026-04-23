import { memo, ReactNode, RefObject, UIEvent, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getScrolRestorationByPath, scrollRestorationActions } from 'features/ScrollRestoration'
import { useSelector } from 'react-redux'
import { StateSchema } from 'app/providers/StoreProvider'
import { useThrottle } from 'shared/lib/hooks/useThrottle/useThrottle'

interface PageProps {
    className?: string,
    children: ReactNode,
    onScrollEnd?: () => void
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef<HTMLElement>(null) as RefObject<HTMLElement>
    const triggerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>
    const dispatch = useAppDispatch()
    const { pathname } = useLocation()
    const scrollPosition = useSelector((state: StateSchema) => getScrolRestorationByPath(state, pathname))

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd
    })

    const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(scrollRestorationActions.setScroolPosition({
            path: pathname,
            position: e.currentTarget.scrollTop
        }))
    }, 500)

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition
    }, [scrollPosition])
    
    return(
        <section 
            ref={wrapperRef}
            className={classNames(cls.page, {}, [className])}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef}/>}
        </section>
    )
})

Page.displayName = 'Page'