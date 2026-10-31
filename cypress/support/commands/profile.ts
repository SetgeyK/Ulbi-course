export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click()
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname)
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname)
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: {Authorization: 'wow'},
        body: {
            id: "99",
            first: "Tester-Yura",
            lastname: "God",
            age: 99,
            currency: "EUR",
            country: "Belarus",
            city: "Moscow",
            username: "bolvanchik",
            avatar: "https://freelance.today/uploads/images/00/07/62/2017/06/13/14c404.jpg"
        }
    })
}

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
