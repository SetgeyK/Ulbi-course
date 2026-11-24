import {
    Listbox as HListBox,
    ListboxButton as HListboxButton,
    ListboxOption as HListboxOption,
    ListboxOptions as HListboxOptions,
} from '@headlessui/react';
import { Fragment, ReactNode, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirections } from '@/shared/types/ui';

import cls from './ListBox.module.scss';
import { HStack } from '../../../../redesigned/Stack/index';
import { Button } from '../../../Button/Button';
import popupCls from '../../styles/popup.module.scss';

export interface ListBoxItem<T extends string> {
    value: T;
    content: ReactNode;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    items?: ListBoxItem<T>[];
    className?: string;
    value?: T;
    defaultValue?: string;
    onChange?: (value: T) => void;
    readonly?: boolean;
    direction?: DropdownDirections;
    label?: string;
}

export function Listbox<T extends string>(props: ListBoxProps<T>) {
    const { items, className, value, defaultValue, onChange, readonly, direction = 'bottom-right', label } = props;
    const selectedItem = useMemo(() => {
        return items?.find((item) => item.value === value);
    }, [value, items]);

    return (
        <HStack gap="8">
            {label && <span className={readonly ? popupCls.disabled : ''}>{`${label}>`}</span>}
            <HListBox
                as={'div'}
                className={classNames(popupCls.popup, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListboxButton as="div" disabled={readonly} className={popupCls.trigger}>
                    <Button variant={'filled'} disabled={readonly} className={readonly ? popupCls.disabled : ''}>
                        {selectedItem?.content ?? defaultValue}
                    </Button>
                </HListboxButton>
                <HListboxOptions
                    className={classNames(`${cls.options} ${popupCls.listBoxOptions}`, {}, [
                        popupCls[direction],
                        popupCls.menu,
                    ])}
                >
                    {items?.map((item) => (
                        <HListboxOption key={item.value} value={item.value} disabled={item.disabled} as={Fragment}>
                            {({ focus, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.focus]: focus,
                                        [popupCls.disabled]: item.disabled,
                                        [popupCls.selected]: selected,
                                    })}
                                >
                                    {selected}
                                    {item.content}
                                </li>
                            )}
                        </HListboxOption>
                    ))}
                </HListboxOptions>
            </HListBox>
        </HStack>
    );
}
