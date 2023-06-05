let currentArticleId: string = '';

describe('User opens article details page', () => {
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((article) => {
            currentArticleId = article.id;
            cy.visit(`articles/${article.id}`);
        });
    });

    afterEach(() => {
        cy.removeArticle(currentArticleId);
    });

    it('User sees contents of the article details page', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });

    it('User sees recommended articles', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });

    it('User posts a comment', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('Test Comment');
        cy.getByTestId('CommentCard.Content').should('exist');
        cy.getByTestId('CommentCard.Content').should(
            'contain.text',
            'Test Comment',
        );
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });

    it('User leaves a star rating', () => {
        cy.getByTestId('ArticleDetails.Info');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(5, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 5);
    });
});
