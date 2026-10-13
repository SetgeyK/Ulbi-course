import { memo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    isUserAdmin,
    userActions,
    isUserManager,
    getUserAuthData
} from '@/entities/User'
import { Avatar } from '@/shared/ui/Avatar/Avatar'
import { DropdownMenu } from '@/shared/ui/Popups/index'
import { classNames } from '@/shared/lib/classNames/classNames'
import { RoutePath } from '@/shared/config/routeConfig/routeConfig'

interface AvatarDropdownProps {
    className?: string
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const dispatch = useDispatch()
    const isAdmin = useSelector(isUserAdmin)
    const isManager = useSelector(isUserManager)
    const authData = useSelector(getUserAuthData)
    
    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])
    
    const isAdminPanelAvalable = isAdmin || isManager

    if(!authData) {
        return null
    }

    return(
        <DropdownMenu 
            direction='bottom-left'
            className={classNames('', {}, [className])}
            items={[
                ...(isAdminPanelAvalable ? [{
                    content: 'Админка',
                    href: RoutePath.admin_panel,
                }] : []),
                {   
                    content: 'Профиль',
                    href: RoutePath.profile + authData.id,
                },
                {
                    content: 'Выйти',
                    onClick: onLogout,
                }
                ]}
                trigger={<Avatar size={30} src={authData.avatar}/>}
            />
    )
})

AvatarDropdown.displayName = 'AvatarDropdown'