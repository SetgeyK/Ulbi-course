import { useCallback, memo } from 'react'
import { useSelector } from 'react-redux'
import { Page } from 'widgets/Page/Page'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { ProfileCard } from 'entities/Profile'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData'
import { getProfileError } from '../../model/selectors/getProfileError/getProfileError'
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading'
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly'
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm'
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateError'
import { profileActions, profileReducer } from '../../model/slice/ProfileSlice'
import { ValidateProfileError } from '../../model/consts/consts'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { EditableProfileCardHeader } from '../EditableProfileCardHeader/EditableProfileCardHeader'
import { VStack } from 'shared/ui/Stack'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'


interface EditableProfileCardProps {
    id?: string,
    className?: string
}

const reducers: ReducersList = {
    profile: profileReducer
}

export const EditableProfileCard = memo((props: EditableProfileCardProps) => {
    const { className, id } = props
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_COUNTRY]: 'Некорректный регион',
        [ValidateProfileError.INCORRECT_USER_DATA]: 'Имя и фимилия обязательны',
        [ValidateProfileError.INCORRECT_USER_AGE]: 'Некорректный возраст',
        [ValidateProfileError.NO_DATA]: 'Данные не указаны',
        [ValidateProfileError.SERVER_ERROR]: 'Серверная ошибка при сохранении'
    }

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({first: value || ''}))
    }, [dispatch])

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({lastname: value || ''}))
    }, [dispatch])

    const onChangeAge = useCallback((value? : string) => {
        dispatch(profileActions.updateProfile({age: Number(value || 0)}))
    }, [dispatch])

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({city: value || ''}))
    }, [dispatch])

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({username: value || ''}))
    }, [dispatch])

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.updateProfile({avatar: value || ''}))
    }, [dispatch])

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateProfile({currency: currency}))
    }, [dispatch])

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateProfile({country: country}))
    }, [dispatch])

    useInitialEffect(() => {
        if(id) {
            dispatch(fetchProfileData(id))
        }
    })

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>Пользователь не найден :(</Page>
        )
    }
    
    return (
        <DynamicModuleLoader reducers={reducers}>
            <VStack gap='16' max>
                <EditableProfileCardHeader />
                {validateErrors?.length && validateErrors.map(err => (
                    <Text
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                        key={err}
                        data-testid={'EditableProfileCard.Error'}
                    />
                    ))}
                <ProfileCard 
                        data={formData}
                        error={error}
                        isLoading={isLoading}
                        onChangeFirstname={onChangeFirstname}
                        onChangeLastname={onChangeLastname}
                        onChangeAge={onChangeAge}
                        onChangeCity={onChangeCity}
                        onChangeAvatar={onChangeAvatar}
                        onChangeUsername={onChangeUsername}
                        onChangeCurrency={onChangeCurrency}
                        onChangeCountry={onChangeCountry}
                        readonly={readonly}
                    />
            </VStack>
        </DynamicModuleLoader>
    )
})

EditableProfileCard.displayName = 'EditableProfileCard'
