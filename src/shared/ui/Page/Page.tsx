import { memo, ReactNode, RefObject, useRef } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Page.module.scss'
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll'

interface PageProps {
    className?: string,
    children: ReactNode,
    onScrollEnd?: () => void
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
    const wrapperRef = useRef<HTMLElement>(null) as RefObject<HTMLElement>
    const triggerRef = useRef<HTMLDivElement>(null) as RefObject<HTMLDivElement>

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        callback: onScrollEnd
    })
    
    return(
        <section ref={wrapperRef} className={classNames(cls.page, {}, [className])}>
            {children}
            <div ref={triggerRef}/>
        </section>
    )
})

Page.displayName = 'Page'