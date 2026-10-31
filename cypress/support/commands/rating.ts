export const setRate = (stars: number, feedback: string) => {
    cy.getByTestId(`StarsRating.${stars}`).click()
    cy.getByTestId('RatingCard.Input').type(feedback)
    cy.getByTestId('RatingCard.SendBtn').click()
}

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(stars: number, feedback: string): Chainable<void>
        }
    }
}