describe('User opens article details page', () => {
    before(() => {
        cy.visit(`articles/1`);
        cy.login();
        cy.wait(1000);
    });

    it('User sees contents of the article details page', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('User sees most-reading articles', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('User sees comments', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
    });
});
