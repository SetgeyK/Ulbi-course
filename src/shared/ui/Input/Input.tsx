import { InputHTMLAttributes, memo, useEffect, useRef, useState } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Input.module.scss'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' |  'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
    className?: string,
    value?: string | number,
    onChange?: (value: string) => void,
    autofocus?: boolean,
    readonly?: boolean
}

export const Input = memo((props: InputProps) => {
    const {
        value,
        onChange,
        className,
        placeholder,
        autofocus,
        type = 'text',
        readonly,
        ...otherProps
    } = props

    const ref = useRef<HTMLInputElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [caretPosition, setCaretPosition] = useState(0)

    const isCaretVisible = isFocused && !readonly

    useEffect(() => {
        if(autofocus) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsFocused(true)
            ref.current?.focus()
        }
    }, [autofocus])

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
        setCaretPosition(e.target.value.length)
    }

    const onBlur = () => {
        setIsFocused(false)
    }

    const onFocus = () => {
        setIsFocused(true)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSelect = (e: any) => {
        setCaretPosition(e?.target?.selectionStart || 0 )
    }

    const mods: Mods = {
        [cls.readonly]: readonly
    }

    return(
        <div className={classNames(cls.inputWrapper, mods, [className])}>
            {placeholder && (
                <div className={cls.placeholder}>
                    {`${placeholder}>`}
                </div>
        )}  
            <div className={cls.caretWrapper}>
                <input 
                ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cls.input}
                onFocus={onFocus}
                onBlur={onBlur}
                onSelect={onSelect}
                readOnly={readonly}
                {...otherProps}
                />
                {isCaretVisible && (<span className={cls.caret} style={{left: `${caretPosition*9.6}px`}}/>)}
            </div>
        </div>
    )
})

Input.displayName = 'Input'