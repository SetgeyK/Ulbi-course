import { memo, useCallback, useState } from 'react'
import cls from './Navbar.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { LoginModal } from 'features/AuthByUsername'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAuthData, userActions } from 'entities/User'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routeConfig/routeConfig'
import { DropdownMenu } from 'shared/ui/Dropdown/Dropdown'
import { Avatar } from 'shared/ui/Avatar/Avatar'

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
                <Text 
                    className={cls.appName}
                    title='LK App'
                    theme={TextTheme.INVERTED}
                />
                <AppLink
                    className={cls.createBtn}
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.PRIMARY}>
                    Создать статью
                </AppLink>
                <DropdownMenu 
                    items={[
                        {
                            content: 'Профиль',
                            href: RoutePath.profile + authData.id,
                        },
                        {
                            content: 'Выйти',
                            onClick: onLogout
                        }
                    ]}
                    className={cls.dropdown}
                    trigger={<Avatar size={30} src={authData.avatar}/>}
                    direction='bottom-left'
                />
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