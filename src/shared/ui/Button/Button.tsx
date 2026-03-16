import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum ButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    OUTLINE_GREEN = 'outline_green',
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
    disabled?: boolean,
    children: ReactNode
}

export const Button = memo((props: ButtonProps) => {
    const {
        className,
        children, 
        theme = ButtonTheme.OUTLINE,
        square,
        disabled,
        size = ButtonsSize.M,
        ...otherProps
    }= props

    const mods: Mods = {
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
})

Button.displayName = 'Button'