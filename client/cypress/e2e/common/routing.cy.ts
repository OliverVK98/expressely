import { selectByTestId } from '../../helpers/selectByTestId';

describe('Routing', () => {
    describe('User is not authorized', () => {
        it('Visit Main Page', () => {
            cy.visit('/');
            cy.get(selectByTestId('MainPage')).should('exist');
        });

        it('Visit Profile Page', () => {
            cy.visit('/profiles/1');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Visit Non-Existing Page', () => {
            cy.visit('/sdfsdfsdfsdf');
            cy.get(selectByTestId('NotFoundPage')).should('exist');
        });
    });

    describe('User is admin and authorized', () => {
        before(() => {
            cy.login();
            cy.wait(1000);
            cy.get(selectByTestId('avatarDropdown')).should('exist');
        });

        it('Visit Profile Page', () => {
            cy.visit('/profile');
            cy.get(selectByTestId('ProfilePage')).should('exist');
        });

        it('Visit Admin Page', () => {
            cy.get(selectByTestId('avatarDropdown')).click();
            cy.get(selectByTestId('AvatarDropdown.AdminPage')).click();
            cy.get(selectByTestId('AdminPage')).should('exist');
        });
    });
});
