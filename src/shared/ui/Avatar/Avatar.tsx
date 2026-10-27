import { CSSProperties, useMemo } from 'react'

import UserIcon from '@/shared/assets/icons/user-32-32.png'
import { classNames } from '@/shared/lib/classNames/classNames'

import cls from './Avatar.module.scss'
import { AppImage } from '../AppImage'
import { Skeleton } from '../Skeleton'

interface AvatarProps {
    className?: string,
    src?: string,
    size?: number,
    alt?: string,
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        size = 100,
        alt = 'image',
        src
    } = props

    const styles = useMemo<CSSProperties>(() => ({
            width: size,
            height: size
        }), [size])

    const errorFallback = <img src={UserIcon} height={size} width={size}/>
    const fallback = <Skeleton height={size} width={size} border={'50%'} />
    
    return(
        <AppImage
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.avatar, {}, [className])}
            fallback={fallback}
            errorFallback={errorFallback}
        />
    )
}