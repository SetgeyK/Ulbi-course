import { memo, useCallback } from 'react'
import { Country } from '../../model/types/country'
import { Listbox } from 'shared/ui/ListBox/ListBox'

interface CountrySelectProps {
    className?: string,
    value?: Country,
    onChange?: (value: Country) => void,
    readonly?: boolean
}

const options = [
    {value: Country.Armenia, content: Country.Armenia},
    {value: Country.Belarus, content: Country.Belarus},
    {value: Country.Kazakhstan, content: Country.Kazakhstan},
    {value: Country.Russia, content: Country.Russia},
    {value: Country.Ukraine, content: Country.Ukraine}
]

export const CountrySelect = memo(({ className, value, onChange, readonly }: CountrySelectProps) => {
    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Country)
    }, [onChange])
    
    return(
        <Listbox 
            items={options}
            value={value}
            className={className}
            defaultValue='Укажите страну'
            onChange={onChangeHandler}
            readonly={readonly}
            label='Укажите страну'
            direction='top'
        />
    )
})

CountrySelect.displayName = 'CountrySelect'