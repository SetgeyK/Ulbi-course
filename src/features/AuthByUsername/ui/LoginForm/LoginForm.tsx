import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cls from './LoginForm.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonsSize, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { loginActions } from '../../model/slice/loginSlice'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'

interface LoginFormProps {
    className?: string
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispatch = useDispatch() 
    const { username, password, isLoading, error } = useSelector(getLoginState)

    const onChangeUsename = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value))
    }, [dispatch])

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value))
    }, [dispatch])

    const onLoginClick = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (dispatch as any)(loginByUsername({username, password}))
    }, [dispatch, username, password])

    return(
        <div className={classNames(cls.loginForm, {}, [className])}>
            <Text title='Форма авторизации' />
            {error && <Text text={error} theme={TextTheme.ERROR} />}
            <Input
                placeholder='Введите логин'
                className={cls.input}
                autofocus
                value={username}
                onChange={onChangeUsename}
            />
            <Input
                placeholder='Введите пароль'
                className={cls.input}
                value={password}
                onChange={onChangePassword}
            />
            <Button 
                size={ButtonsSize.M}
                onClick={onLoginClick}
                className={cls.loginBtn}
                theme={ButtonTheme.CLEAR}
                disabled={isLoading}
            >
                Login
            </Button>
        </div>
    )
})

LoginForm.displayName = 'LoginForm'