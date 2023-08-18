describe('User visits articles page', () => {
    before(() => {
        cy.visit(`articles`);
        cy.login();
        cy.wait(1000);
    });

    it('Articles are successfully loaded', () => {
        cy.getByTestId('ArticleList').should('exist');
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3);
    });
});
