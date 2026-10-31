describe('Пользователь заходит на страницу со списком статей', () => {
  beforeEach(() => {
    cy.login().then(data => {
      cy.visit('articles')
    })
  })
  it('Статьи успешно подгружаются', () => {
    cy.getByTestId('ArticleList').should('exist')
    cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
  })
})