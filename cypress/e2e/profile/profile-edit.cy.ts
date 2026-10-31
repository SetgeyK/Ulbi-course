let profileId: string
describe('Пользователь заходит на страницу пользователя', () => {
  beforeEach(() => {
    cy.visit('')
    cy.login().then(data => {
      profileId = data.id
      cy.visit(`profile/${data.id}`)
    })
  })
  afterEach(() => {
    cy.resetProfile(profileId)
  })
  it('И профиль успешно загружается', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'Tester-Yura')
  })
  it('И редактирует', () => {
    const newName = 'Tester-Borya'
    const newLastname = 'More then god'
    cy.updateProfile(newName, newLastname )
    cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
    cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
  })
}) 