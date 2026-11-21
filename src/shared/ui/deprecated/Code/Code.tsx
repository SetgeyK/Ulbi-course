import { useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
// eslint-disable-next-line @sj_lk/sj-plugin/path-checker
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';

import cls from './Code.module.scss';

interface CodeProps {
    className?: string;
    text: string;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */

export const Code = ({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);
    return (
        <pre className={classNames(cls.code, {}, [className])}>
            <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR} onClick={onCopy}>
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
};
