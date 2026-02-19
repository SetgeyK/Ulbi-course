import { classNames } from 'shared/lib/classNames/classNames'
import cls from './LoginForm.module.scss'
import { Button, ButtonsSize, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
    return(
        <div className={classNames(cls.loginForm, {}, [className])}>
            <Input
                placeholder='Введите логин'
                className={cls.input}
                autofocus/>
            <Input
                placeholder='Введите пароль'
                className={cls.input}/>
            <Button className={cls.loginBtn} size={ButtonsSize.M} theme={ButtonTheme.CLEAR}>
                Login
            </Button>
        </div>
    )
}