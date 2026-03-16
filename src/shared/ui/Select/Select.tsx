import { memo, useMemo } from 'react'
import { classNames, Mods } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'
import { ChangeEvent } from 'react'

interface SelectOption {
    value: string,
    content: string
}

interface SelectProps {
    className?: string,
    label?: string,
    options?: SelectOption[],
    value?: string,
    onChange?: (value: string) => void,
    readonly?: boolean
}

export const Select = memo((props: SelectProps) => {
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
            onChange(e.target.value)
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
})

Select.displayName = 'Select'