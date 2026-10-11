import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface AnimationContextPayload {
    Gesture?: GestureType,
    Spring?: SpringType,
    isLoaded?: boolean
}

const AnimationContext = createContext<AnimationContextPayload>({})

const getAsyncAnimationModules = async () => {
    return Promise.all([
        import('@react-spring/web'),
        import('@use-gesture/react')
    ])
}

export const useAnimationLibs = () => {
     return useContext(AnimationContext) as Required<AnimationContextPayload>
}

export const AnimationProvider = ({children}: {children: ReactNode}) => {
    const [Spring, setSpring] = useState<SpringType>()
    const [Gesture, setGesture] = useState<GestureType>()
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            setSpring(Spring)
            setGesture(Gesture)
            setIsLoaded(true)
        })
    }, [])

    const value = useMemo(() => ({
        Spring,
        Gesture,
        isLoaded
    }), [isLoaded, Spring, Gesture])

    return (
        <AnimationContext.Provider
            value={value}
        >
            {children}
        </AnimationContext.Provider>
    )
}