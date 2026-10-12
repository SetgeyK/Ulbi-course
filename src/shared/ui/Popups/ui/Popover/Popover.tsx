import { ReactNode } from 'react'
import {
    Popover as HPopover,
    PopoverButton as HPopoverButton,
    PopoverPanel as HPopoverPanel
} from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'
import { DropdownDirections } from '@/shared/types/ui'

interface PopoverProps {
    trigger: ReactNode,
    className?: string,
    direction?: DropdownDirections,
    children: ReactNode
}

export function Popover (props: PopoverProps) {
    const {
        trigger,
        className,
        direction = 'bottom-right',
        children
    } = props

    return(
        <HPopover
            as='div'
            className={classNames(cls.popover, {}, [className, popupCls.popup])}
        >
            <HPopoverButton as='div' className={popupCls.trigger}>
                {trigger}
            </HPopoverButton>
            <HPopoverPanel
                className={classNames(`${cls.panel} ${popupCls.panel}`, {}, [popupCls[direction]])}
            >
                {children}
            </HPopoverPanel>
        </HPopover>
    )
}
