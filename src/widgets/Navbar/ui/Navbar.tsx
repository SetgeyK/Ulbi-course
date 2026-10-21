import { memo, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import cls from './Navbar.module.scss'
import { LoginModal } from '@/features/AuthByUsername'
import { AvatarDropdown } from '@/features/avatarDropdown'
import { NotificationButton } from '@/features/notificationButton'
import { getUserAuthData } from '@/entities/User'
import { Text, TextTheme } from '@/shared/ui/Text'
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink'
import { HStack } from '@/shared/ui/Stack'
import { RoutePath } from '@/shared/const/router'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, ButtonTheme } from '@/shared/ui/Button'

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState<boolean>(false)
    const authData = useSelector(getUserAuthData)
    
    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])
    
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
                <HStack gap='16' className={cls.actions}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
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