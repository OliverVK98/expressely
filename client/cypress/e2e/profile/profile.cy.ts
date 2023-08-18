let profileId: string;

describe('User visits his profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login();
        cy.wait(1000);
    });

    afterEach(() => {
        cy.resetProfile(profileId);
    });

    it('Profile loads successfully', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'Vlad');
    });

    it('EditProfile', () => {
        cy.updateProfile();
        cy.getByTestId('ProfileCard.firstname').should(
            'have.value',
            'NewTestFirstname',
        );
        cy.getByTestId('ProfileCard.lastname').should(
            'have.value',
            'NewTestLastname',
        );
    });
});
