import { memo, useCallback } from 'react'
import { Currency } from '../../model/types/currency'
import { Listbox } from 'shared/ui/ListBox/ListBox'

interface CurrencySelectProps {
    className?: string,
    value?: Currency,
    onChange?: (value: Currency) => void,
    readonly?: boolean
}

const options = [
    {value: Currency.RUB, content: Currency.RUB},
    {value: Currency.EUR, content: Currency.EUR},
    {value: Currency.USD, content: Currency.USD}
]

export const CurrencySelect = memo(({ className, value, onChange, readonly }: CurrencySelectProps) => {
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Currency)
    }, [onChange])

    return (
        <Listbox 
            items={options}
            value={value}
            className={className}
            defaultValue='Укажите валюту'
            onChange={onChangeHandler}
            label='Укажите валюту'
            readonly={readonly}
            direction='top-right'
        />
    )
})

CurrencySelect.displayName = 'CurrencySelect'