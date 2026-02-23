import { memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cls from './LoginForm.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonsSize, ButtonTheme } from 'shared/ui/Button/Button'
import { Input } from 'shared/ui/Input/Input'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

interface LoginFormProps {
    className?: string
}

const initialReducers: ReducersList ={
    loginForm: loginReducer
}

const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispatch = useDispatch() 
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)
    const error = useSelector(getLoginError)

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
        <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
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
        </DynamicModuleLoader>
    )
})

LoginForm.displayName = 'LoginForm'

export default LoginForm