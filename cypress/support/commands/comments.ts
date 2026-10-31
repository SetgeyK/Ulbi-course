export const addComment = (commentText: string) => {
    cy.getByTestId('AddCommentForm.Input').type(commentText)
    cy.getByTestId('AddCommentForm.Button').click()
}

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(commentText: string): Chainable<void>
        }
    }
}