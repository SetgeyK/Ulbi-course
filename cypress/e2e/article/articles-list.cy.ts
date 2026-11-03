describe('Пользователь заходит на страницу со списком статей', () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        cy.login().then((data) => {
            cy.visit('articles');
        });
    });
    it('Статьи успешно подгружаются', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
    it('На стабах (фикстурах)', () => {
        cy.intercept('GET', 'http://localhost:8000/articles?*', { fixture: 'articles.json' });
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
    it.skip('Пример заскипанного теста', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
        cy.get('asdf').should('exist');
    });
});
