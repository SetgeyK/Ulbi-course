/* eslint-disable @typescript-eslint/no-explicit-any */
import { RefObject, useCallback, useRef } from 'react';

export function useDebounce (callback: (...arg: any[]) => void, delay: number) {
    const timer = useRef(null) as RefObject<any>

    return useCallback((...args: any[]) => {
        if(timer.current) {
            clearTimeout(timer.current)
        }
        timer.current = setTimeout(() => {
            callback(...args)
        }, delay)
    }, [callback, delay])
}