import { Fragment, ReactNode } from 'react'
import {
    Listbox as HListBox,
    ListboxButton as HListboxButton,
    ListboxOption as HListboxOption,
    ListboxOptions as HListboxOptions
} from '@headlessui/react'

import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button } from '../../../Button/Button'
import { HStack } from '../../../Stack/index'
import { DropdownDirections } from '@/shared/types/ui'

export interface ListBoxItem {
    value: string;
    content: ReactNode;
    disabled?: boolean;
}

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
        direction = 'bottom-right',
        label
    } = props

    return (
        <HStack gap='8'>
            {label && <span className={readonly ? popupCls.disabled : ''}>{`${label}>`}</span>}
            <HListBox
                as={'div'}
                className={classNames(popupCls.popup, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListboxButton as='div' disabled={readonly} className={popupCls.trigger}>
                    <Button disabled={readonly} className={readonly ? popupCls.disabled : ''}>
                        {value ?? defaultValue}
                    </Button>
                </HListboxButton>
                <HListboxOptions
                    className={classNames(`${cls.options} ${popupCls.listBoxOptions}`, {}, [popupCls[direction]])}
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
                                            [popupCls.focus]: focus,
                                            [popupCls.disabled]: item.disabled
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