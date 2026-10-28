import { memo, ReactNode, RefObject, UIEvent, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { StateSchema } from '@/app/providers/StoreProvider'
import { getScrolRestorationByPath, scrollRestorationActions } from '@/features/ScrollRestoration'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle'

import cls from './Page.module.scss'

interface PageProps {
    className?: string,
    children: ReactNode,
    onScrollEnd?: () => void,
    dataTestid?: string
}

export const Page = memo(({ className, children, onScrollEnd, dataTestid = 'Page' }: PageProps) => {
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
        <main 
            ref={wrapperRef}
            className={classNames(cls.page, {}, [className])}
            onScroll={onScroll}
            data-testid={dataTestid}
        >
            {children}
            {onScrollEnd && <div className={cls.trigger} ref={triggerRef}/>}
        </main>
    )
})

Page.displayName = 'Page'