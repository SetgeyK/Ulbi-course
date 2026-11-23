import { memo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { isUserAdmin, userActions, isUserManager, getUserAuthData } from '@/entities/User';
import { getRouteAdminPanel, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { DropdownMenu as DropdownMenuDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { DropdownMenu } from '@/shared/ui/redesigned/Popups';

interface AvatarDropdownProps {
    className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector(isUserAdmin);
    const isManager = useSelector(isUserManager);
    const authData = useSelector(getUserAuthData);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    const isAdminPanelAvalable = isAdmin || isManager;

    if (!authData) {
        return null;
    }

    const items = [
        ...(isAdminPanelAvalable
            ? [
                  {
                      content: 'Админка',
                      href: getRouteAdminPanel(),
                  },
              ]
            : []),
        {
            content: 'Профиль',
            href: getRouteProfile(authData.id),
        },
        {
            content: 'Выйти',
            onClick: onLogout,
        },
    ];

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <DropdownMenuDeprecated
                    direction="bottom-left"
                    className={classNames('', {}, [className])}
                    items={items}
                    trigger={<AvatarDeprecated size={30} src={authData.avatar} />}
                />
            }
            on={
                <DropdownMenu
                    direction="bottom-left"
                    className={classNames('', {}, [className])}
                    items={items}
                    trigger={<Avatar size={40} src={authData.avatar} />}
                />
            }
        />
    );
});

AvatarDropdown.displayName = 'AvatarDropdown';
