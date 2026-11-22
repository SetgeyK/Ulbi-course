import { memo, ReactNode } from 'react';
import { LinkProps, NavLink } from 'react-router';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export type AppLinkVariant = 'primary' | 'red';

interface AppLinkProps extends LinkProps {
    className?: string;
    variant?: AppLinkVariant;
    children?: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const { className, to, children, variant = 'primary', activeClassName = '', ...otherProps } = props;
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.appLink, { [activeClassName]: isActive }, [className, cls[variant]])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});

AppLink.displayName = 'Applink';
