import { useCallback } from 'react'
import cls from './Code.module.scss'
import { classNames } from '@/shared/lib/classNames/classNames'
// eslint-disable-next-line @sj_lk/sj-plugin/path-checker
import { Button, ButtonTheme } from '@/shared/ui/Button'
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg'

interface CodeProps {
    className?: string,
    text: string
}

export const Code = ({ className, text }: CodeProps) => {
    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])
    return(
        <pre className={classNames(cls.code, {}, [className])}>
            <Button className={cls.copyBtn} theme={ButtonTheme.CLEAR} onClick={onCopy}>
                <CopyIcon className={cls.copyIcon} />
            </Button>
            <code>
                {text}
            </code>
        </pre>
    )
}