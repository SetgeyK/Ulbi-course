import { Fragment, ReactNode } from 'react'
import {
    Listbox as HListBox,
    ListboxButton as HListboxButton,
    ListboxOption as HListboxOption,
    ListboxOptions as HListboxOptions
} from '@headlessui/react'

import cls from './ListBox.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from '../Button/Button'
import { HStack } from '../Stack'

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

type DropdownDirections = 'top' | 'bottom'

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirections,
    label?: string
}


export function Listbox(props: ListBoxProps) {
    const {
        items,
        className,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom',
        label
    } = props

    const optionsClasses = [cls[direction]]

    return (
        <HStack gap='8'>
            {label && <span className={readonly ? cls.disabled : ''}>{`${label}>`}</span>}
            <HListBox
        as={'div'}
        className={classNames(cls.listBox, {}, [className])}
        value={value}
        onChange={onChange}
        disabled={readonly}
    >
                <HListboxButton disabled={readonly} className={cls.trigger}>
                    <Button disabled={readonly}>
                        {value ?? defaultValue}
                    </Button>
                </HListboxButton>
                <HListboxOptions
            className={classNames(cls.options, {}, optionsClasses)}
        >
                    {items?.map((item) => (
                        <HListboxOption
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                        as={Fragment}
                    >
                            {({ focus, selected }) => (
                                <li
                                className={classNames(
                                    cls.item,
                                    {
                                        [cls.focus]: focus,
                                        [cls.disabled]: item.disabled
                                    }
                                )}
                            > 
                                    {selected && <span>{'\u2705'}</span>}
                                    {item.content}
                                </li>
                    )}
                        </HListboxOption>
        ))}
                </HListboxOptions>
            </HListBox>
        </HStack>
    )
}