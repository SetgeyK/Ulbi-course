import { RefObject, useEffect } from 'react'

export interface UseInfiniteScrollOptions {
    callback?: () => void,
    triggerRef: RefObject<HTMLElement>
    wrapperRef: RefObject<HTMLElement>
}

export function useInfiniteScroll (props: UseInfiniteScrollOptions) {
    const {
        callback,
        triggerRef,
        wrapperRef
    } = props

    useEffect(() => {
        let observer: IntersectionObserver | null = null
        
        if(callback) {
            const options = {
                root: wrapperRef.current,
                rootMargin: '0px',
                threshold: 1.0
            }

            observer = new IntersectionObserver(([entry]) => {
                if(entry.isIntersecting) {
                    callback()
                }
            }, options)

            observer.observe(triggerRef.current)
        }

        return () => {
            if(observer) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                observer.unobserve(triggerRef.current)
            }
        }
    }, [triggerRef, wrapperRef, callback])
}