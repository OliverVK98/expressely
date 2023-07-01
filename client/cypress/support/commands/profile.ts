export const updateProfile = () => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.firstname').clear().type('NewTestFirstname');
    cy.getByTestId('ProfileCard.lastname').clear().type('NewTestLastname');
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) =>
    cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'testAuth' },
        body: {
            id: '3',
            firstname: 'Vlad',
            lastname: 'Kezik',
            age: 29,
            currency: 'USD',
            country: 'USA',
            city: 'New York',
            username: 'vkezik',
            avatar: 'https://cdn2.iconfinder.com/data/icons/social-flat-buttons-3/512/anonymous-512.png',
        },
    });

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(): Chainable<void>;
            resetProfile(profileId: string): Chainable<void>;
        }
    }
}
