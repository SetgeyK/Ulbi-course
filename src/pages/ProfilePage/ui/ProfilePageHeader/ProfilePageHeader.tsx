import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { useSelector } from 'react-redux'
import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getUserAuthData } from 'entities/User'
import { HStack } from 'shared/ui/Stack/HStack/HStack'

interface ProfilePageHeaderProps {
    className?: string
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
    const authData = useSelector(getUserAuthData)
    const profileData = useSelector(getProfileData)
    const canEdit = authData?.id === profileData?.id
    const readonly = useSelector(getProfileReadonly)
    const dispatch = useAppDispatch()
    
    const onEdit = useCallback(() => {
        dispatch(profileActions.setReadonly(false))
    }, [dispatch])

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit())
    }, [dispatch])

    const onSave = useCallback(() => {
        dispatch(updateProfileData())
    }, [dispatch])

    return(
        <HStack max justify='between' className={classNames('', {}, [className])}>
            <Text 
                    title='Профиль'
                />
                 
            { canEdit && (
                <>
                    {readonly
                            ? (
                                <Button 
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                >
                                    Редактировать
                                </Button>
                            ) : (
                                <HStack gap='8'>
                                    <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                >
                                        Отменить
                                    </Button>
                                    <Button
                                    theme={ButtonTheme.OUTLINE_GREEN}
                                    onClick={onSave}
                                >
                                        Сохранить
                                    </Button>
                                </HStack>
                            )
                        }
                </>
            )}
        </HStack>
    )
}