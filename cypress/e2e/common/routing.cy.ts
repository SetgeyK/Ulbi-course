
describe('Роутинг', () => {
  describe('Пользователь НЕ авторизован', () => {
    it('Переход на главную страницу', () => {
      cy.visit('/')
      cy.getByTestId('MainPage').should('exist')
    })
    it.skip('Переход окрывает страницу профиля', () => {
      cy.visit('/profile/1')
      cy.getByTestId('MainPage').should('exist')
    })
    it('Переход окрывает несуществующий маршрут', () => {
      cy.visit('/asdfasfasf/12')
      cy.getByTestId('NotFoundPage').should('exist')
    })
  })
  describe('Пользователь авторизован', () => {
    it('Переход окрывает страницу профиля', () => {
      cy.login()
      cy.visit('/profile/1')
      cy.getByTestId('ProfilePage').should('exist')
    })
    it('Переход окрывает страницу со списком статей', () => {
      cy.login()
      cy.visit('/articles')
      cy.getByTestId('ArticlesPage').should('exist')
    })
  })
})