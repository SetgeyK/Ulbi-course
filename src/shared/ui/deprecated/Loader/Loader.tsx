import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Loader = ({ className }: LoaderProps) => {
    return <div className={classNames(cls.loader, {}, [className])} />;
};
