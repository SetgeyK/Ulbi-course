import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { 
    fetchProfileData,
    ProfileCard,
    profileReducer,
    getProfileError,
    getProfileIsLoading,
    profileActions,
    getProfileReadonly,
    getProfileForm,
    getProfileValidateErrors,
    ValidateProfileError
} from 'entities/Profile'
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { Page } from 'widgets/Page/Page'

const reducers: ReducersList = {
    profile: profileReducer
}

interface ProfilePageProps {
    className?: string
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const dispatch = useAppDispatch()
    const formData = useSelector(getProfileForm)
    const isLoading = useSelector(getProfileIsLoading)
    const error = useSelector(getProfileError)
    const readonly = useSelector(getProfileReadonly)
    const validateErrors = useSelector(getProfileValidateErrors)
    const { id } = useParams<{id: string}>()

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

    const onChangeAge = useCallback((value?: string) => {
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

    useEffect(() => {
        if(id) {
            dispatch(fetchProfileData(id))
        }
    }, [dispatch, id])

    if (!id) {
        return (
            <Page className={classNames('', {}, [className])}>Пользователь не найден :(</Page>
        )
    }

    return(
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <Page className={classNames('', {}, [className])}>
                <ProfilePageHeader />
                {validateErrors?.length && validateErrors.map(err => (
                    <Text theme={TextTheme.ERROR} text={validateErrorTranslates[err]} key={err} />
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
            </Page>
        </DynamicModuleLoader>
    )
}

export default ProfilePage