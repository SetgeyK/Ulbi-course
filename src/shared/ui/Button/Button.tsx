import { ButtonHTMLAttributes, FC } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted'
}

export enum ButtonsSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string,
    theme? : ButtonTheme,
    square?: boolean,
    size?: ButtonsSize,
    disabled?: boolean
}

export const Button: FC<ButtonProps> = (props) => {
    const {
        className,
        children, 
        theme,
        square,
        disabled,
        size = ButtonsSize.M,
        ...otherProps
    }= props

    const mods: Record<string, boolean> = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled
    }


    return(
        <button 
            className={classNames(cls.button, mods, [className])}
            disabled={disabled}
            {...otherProps}
        >
            {children}
        </button>
    )
}