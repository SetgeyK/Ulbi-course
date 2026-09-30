import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { $api } from 'shared/api/api'
import { componentRender } from 'shared/lib/tests/componentRender/componentRender'
import { EditableProfileCard } from './EditableProfileCard'
import { Profile } from 'entities/Profile'
import { Currency } from 'entities/Currency'
import { Country } from 'entities/Country'
import { profileReducer } from '../../model/slice/ProfileSlice'

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 41,
    currency: Currency.RUB,
    country: Country.Kazakhstan,
    username: 'yourBestAdmin'
}

const getTestOptions = () => ({
    route: '/profile/1',
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
            error: undefined,
            isLoading: false
        },
        user: {
            authData: {id: '1', username: 'admin'}
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
})

describe('features/EditableProfileCard', () => {
    test('Режим readonly должен переключиться', async () => {
        const user = userEvent.setup()
        componentRender(<EditableProfileCard  id='1'/>, getTestOptions())
        await user.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument()
    })

    test('При отмене значения должны обнуляться', async () => {
        const user = userEvent.setup()
        componentRender(<EditableProfileCard  id='1'/>, getTestOptions())
        await user.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await user.clear(screen.getByTestId('ProfileCard.firstname'))
        await user.clear(screen.getByTestId('ProfileCard.lastname'))
        
        await user.type(screen.getByTestId('ProfileCard.firstname'), 'user')
        await user.type(screen.getByTestId('ProfileCard.lastname'), 'user')

        
        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user')
        
        await user.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'))

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin')
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin')
    })

    test('Должна появляться ошибка', async () => {
        const user = userEvent.setup()
        componentRender(<EditableProfileCard  id='1'/>, getTestOptions())
        await user.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await user.clear(screen.getByTestId('ProfileCard.firstname'))
        
        await user.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument()
    })

    test('Если нет ошибок валидации, то на сервер должен уйти PUT запрос', async () => {
        const mockPutReq = jest.spyOn($api, 'put')
        const user = userEvent.setup()
        componentRender(<EditableProfileCard  id='1'/>, getTestOptions())
        await user.click(screen.getByTestId('EditableProfileCardHeader.EditButton'))

        await user.type(screen.getByTestId('ProfileCard.firstname'), 'user')
        
        await user.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'))

        expect(mockPutReq).toHaveBeenCalled()
    })
})