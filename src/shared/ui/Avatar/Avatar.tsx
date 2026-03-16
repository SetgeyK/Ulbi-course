import { CSSProperties, useMemo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string,
    src?: string,
    size?: number,
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        size,
        alt = 'image',
        src
    } = props

    const styles = useMemo<CSSProperties>(() => ({
            width: size || 100,
            height: size || 100
        }), [size])
    return(
        <img
            src={src}
            style={styles}
            alt={alt}
            className={classNames(cls.avatar, {}, [className])} />
    )
}