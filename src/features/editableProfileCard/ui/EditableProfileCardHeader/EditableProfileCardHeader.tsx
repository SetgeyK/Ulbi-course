import { useCallback } from 'react'
import { useSelector } from 'react-redux'

import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Button, ButtonTheme } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'
import { Text } from '@/shared/ui/Text'

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData'
import { profileActions } from '../../model/slice/ProfileSlice'

interface EditableProfileCardHeaderProps {
    className?: string
}

export const EditableProfileCardHeader = ({ className }: EditableProfileCardHeaderProps) => {
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
                                    data-testid={'EditableProfileCardHeader.EditButton'}
                                >
                                    Редактировать
                                </Button>
                            ) : (
                                <HStack gap='8'>
                                    <Button
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancelEdit}
                                    data-testid={'EditableProfileCardHeader.CancelButton'}
                                >
                                        Отменить
                                    </Button>
                                    <Button
                                    theme={ButtonTheme.OUTLINE_GREEN}
                                    onClick={onSave}
                                    data-testid={'EditableProfileCardHeader.SaveButton'}
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