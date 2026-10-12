import { Fragment, ReactNode } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import cls from './Dropdown.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames';
import { DropdownDirections } from '@/shared/types/ui';
import { AppLink } from '../../../AppLink/AppLink';

interface DropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownMenuProps {
    items: DropdownItem[];
    trigger: ReactNode; 
    className?: string;
    direction?: DropdownDirections,
}

export function DropdownMenu(props: DropdownMenuProps) {
    const {
        className,
        items,
        trigger,
        direction = 'bottom-left'
    } = props

    return (
        <Menu as='div' className={classNames(popupCls.popup, {}, [className])}>
            <MenuButton className={popupCls.trigger}>
                {trigger}
            </MenuButton>
            <MenuItems className={classNames(`${cls.menu} ${popupCls.dropdownMenu}`, {}, [popupCls[direction]])} portal={false}>
                {items.map(item => {
                    const content = ({focus}: {focus: boolean}) => (
                        <button 
                            type='button'
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {[popupCls.focus]: focus})}
                        >
                            {item.content}
                        </button>
                    )

                    if(item.href) {
                        return (
                            <MenuItem
                            as={AppLink}
                            to={item.href}
                            disabled={item.disabled}
                            key={item.href}
                        >
                                {content}
                            </MenuItem>
                        )
                    }
                    return (
                        <MenuItem as={Fragment} disabled={item.disabled} key={item.href}
                        >
                            {content}
                        </MenuItem>
                    )
                })}

            </MenuItems>
        </Menu>
    )
}