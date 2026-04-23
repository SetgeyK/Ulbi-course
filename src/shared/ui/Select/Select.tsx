import { useMemo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import { ChangeEvent } from 'react'

export interface SelectOption<T extends string> {
    value: T,
    content: string
}

interface SelectProps<T extends string> {
    className?: string,
    label?: string,
    options?: SelectOption<T>[],
    value?: T,
    onChange?: (value: T) => void,
    readonly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const {
        className,
        label,
        options,
        onChange,
        value,
        readonly
    } = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T)
        }
    }
    const mods: Mods = {
        [cls.readonly]: readonly
    }

    const optionList = useMemo(() => {
        return (
            options?.map((seletOption) => (
                <option 
                    className={cls.option}
                    value={seletOption.value}
                    key={seletOption.value}
                >
                    {seletOption.content}
                </option>
                )
            )
        )
    }, [options])

    return(
        <div className={classNames(cls.Wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}
            <select 
                className={cls.select}
                value={value}
                onChange={onChangeHandler}
                disabled={readonly}
            >
                {optionList}
            </select>
        </div>
    )
}
