import { HTMLAttributes, ReactNode } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Card.module.scss';

export type CardVariant = 'normal' | 'outlined' | 'light';
type CardPadding = '0' | '8' | '16' | '24';
type CardBorder = 'round_border' | 'normal_border';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    children: ReactNode;
    variant?: CardVariant;
    max?: boolean;
    padding?: CardPadding;
    border?: CardBorder;
}

const mapPaddingToClass: Record<CardPadding, string> = {
    '0': 'gap_0',
    '8': 'gap_8',
    '16': 'gap_16',
    '24': 'gap_24',
};

export const Card = ({
    className,
    children,
    variant = 'normal',
    max,
    padding = '8',
    border = 'normal_border',
    ...otherProps
}: CardProps) => {
    const paddingClass = mapPaddingToClass[padding];
    return (
        <div
            className={classNames(cls.card, { [cls.fullWidth]: max }, [
                className,
                cls[variant],
                cls[paddingClass],
                cls[border],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    );
};
