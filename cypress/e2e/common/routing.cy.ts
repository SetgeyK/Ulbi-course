import { selectByTestId } from '../../helpers/selectByTestId'

describe('Роутинг', () => {
  describe('Пользователь НЕ авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/')
      cy.get(selectByTestId('MainPage')).should('exist')
    })
    it('Переход окрывает страницу профиля', () => {
      cy.visit('/profile/1')
      cy.get(selectByTestId('MainPage')).should('exist')
    })
    it('Переход окрывает несуществующий маршрут', () => {
      cy.visit('/asdfasfasf/12')
      cy.get(selectByTestId('NotFoundPage')).should('exist')
    })
  })
  describe('Пользователь авторизован', () => {
    it('Переход окрывает страницу профиля', () => {
      cy.login()
      cy.visit('/profile/1')
      cy.get(selectByTestId('ProfilePage')).should('exist')
    })
    it('Переход окрывает страницу со списком статей', () => {
      cy.login()
      cy.visit('/articles')
      cy.get(selectByTestId('ArticlesPage')).should('exist')
    })
  })
})