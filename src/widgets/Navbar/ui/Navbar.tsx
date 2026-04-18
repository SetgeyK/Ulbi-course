import { memo, useCallback, useState } from 'react'
import cls from './Navbar.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false)
    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (authData) {
        return(
            <header className={classNames(cls.navbar, {}, [className])}>
                <Button 
                    className={cls.links}
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onLogout}
                >
                    Выйти
                </Button>
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            </header>
        )
    }

    return(
        <header className={classNames(cls.navbar, {}, [className])}>
            <Button 
                className={cls.links}
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onShowModal}
            >
                Войти
            </Button>
            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    )
})

Navbar.displayName = 'Navbar'