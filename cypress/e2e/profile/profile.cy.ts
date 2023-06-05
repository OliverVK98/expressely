let profileId: string;

describe('User visits his profile page', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
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
